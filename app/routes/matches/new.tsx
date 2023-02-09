import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData, useLoaderData, Form } from '@remix-run/react';

import { db } from '~/utils/db.server';
import { badRequest } from '~/utils/request.server';
import {
  setPlayerVibe as setVibe,
  setDateTime as setTime,
} from '~/models/matches.server';
import { useState } from 'react';

export const loader = async () => {
  const maps = await db.map.findMany({});
  const heroes = await db.hero.findMany({});
  const players = await db.player.findMany({});
  return json({ maps, heroes, players });
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const map = form.get('map');
  const gameMode = form.get('gamemode');
  const attackFirst = form.get('attackFirst');
  const matchResult = form.get('result');
  const date = form.get('date');
  const vibe = form.get('vibe');
  const comment = form.get('comment');
  const playerHeroes: { [key: string]: string[] } = {};

  for (const [name, value] of form.entries()) {
    if (name.startsWith('playerHero-')) {
      const playerId = name.replace('playerHero-', '');
      const heroes = (value as string).split(',');
      playerHeroes[playerId] = playerHeroes[playerId] || [];
      playerHeroes[playerId].push(...heroes);
    }
  }

  const players = form.getAll('players');
  const selectedPlayers = [];
  for (const player of players) {
    selectedPlayers.push(player.toString());
  }

  console.log(
    map,
    gameMode,
    matchResult,
    attackFirst,
    playerHeroes,
    selectedPlayers,
    date,
    vibe,
    comment
  );

  if (
    typeof map !== 'string' ||
    typeof gameMode !== 'string' ||
    typeof attackFirst !== 'string' ||
    typeof matchResult !== 'string' ||
    typeof vibe !== 'string' ||
    typeof comment !== 'string' ||
    typeof date !== 'string' ||
    typeof playerHeroes !== 'object' ||
    typeof selectedPlayers !== 'object'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }
  console.log('form submitted correctly');

  function convertToBoolean(attackFirst: string) {
    if (attackFirst === 'true') {
      return true;
    } else {
      return false;
    }
  }

  function playerHeroesData(playedHeroes: { [key: string]: string[] }) {
    return Object.entries(playedHeroes).reduce((acc, [playerId, heroes]) => {
      return acc.concat(
        heroes.map((heroId) => ({
          heroId,
          playerId,
        }))
      );
    }, [] as { heroId: string; playerId: string }[]);
  }

  console.log(playerHeroesData(playerHeroes));

  function selectedPlayersData(
    selectedPlayers: string[]
  ): Array<{ id: string }> {
    const playersData = [];

    for (const player of selectedPlayers) {
      playersData.push({ id: player });
    }

    return playersData;
  }

  console.log(selectedPlayersData(selectedPlayers));

  const fields = {
    location: {
      connect: {
        id: map,
      },
    },
    heroes: {
      create: playerHeroesData(playerHeroes),
    },
    account: {
      connect: selectedPlayersData(selectedPlayers),
    },
    gameMode: gameMode,
    attackFirst: convertToBoolean(attackFirst),
    matchResult: matchResult,
    playerVibe: setVibe(vibe),
    comment: comment,
    matchDate: setTime(date),
  };

  console.log('no field errors, creating match');
  const match = await db.match.create({
    data: fields,
  });

  console.log('new match created: ', match.id);

  return redirect(`/matches/${match.id}`);
};

export default function NewMatch() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [selectedMap, setSelectedMap] = useState<string>('');
  const [playersSelected, setPlayersSelected] = useState<string[]>([]);
  const [playerHeroes, setPlayerHeroes] = useState<{ [key: string]: string[] }>(
    {}
  );

  // const handleHeroSelection = (playerId: string) => (e) => {
  //   setPlayerHeroes({
  //     ...playerHeroes,
  //     [playerId]: e.target.value,
  //   });
  // };

  return (
    <div>
      <p>Enter new match details</p>
      <Form method="post">
        <div>
          <label htmlFor="map">Map: </label>
          <select
            name="map"
            id="map"
            onChange={(e) => {
              setSelectedMap(e.target.value);
            }}
          >
            {data.maps.map((map) => (
              <option key={map.id} value={map.id}>
                {map.name}
              </option>
            ))}
          </select>
        </div>
        {(selectedMap &&
          data.maps.find((map) => map.id === selectedMap)?.type === 'Hybrid') ||
        (selectedMap &&
          data.maps.find((map) => map.id === selectedMap)?.type ===
            'Escort') ? (
          <div>
            <p>
              Attack First:
              <input type="radio" id="yes" name="attackFirst" value="true" />
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="no" name="attackFirst" value="false" />
              <label htmlFor="no">No</label>
            </p>
          </div>
        ) : null}
        <div>
          <p>
            Mode:
            <input
              type="radio"
              id="quickplay"
              name="gamemode"
              value="Quick Play"
            />
            <label htmlFor="quickplay">Quick Play</label>
            <input
              type="radio"
              id="competitive"
              name="gamemode"
              value="Competitive"
            />
            <label htmlFor="competitive">Competitive</label>
          </p>
        </div>
        <div>
          <p>
            Result:
            <input type="radio" id="win" name="result" value="Win" />
            <label htmlFor="win">Win</label>
            <input type="radio" id="loss" name="result" value="Loss" />
            <label htmlFor="loss">Loss</label>
            <input type="radio" id="draw" name="result" value="Draw" />
            <label htmlFor="draw">Draw</label>
          </p>
        </div>
        <div>
          <p>
            <label htmlFor="players">Who was in the match?:</label>{' '}
          </p>
          <p>
            <select
              multiple
              name="players"
              id="players"
              onChange={(e) => {
                console.log(e.target.selectedOptions);
                setPlayersSelected(
                  [...e.target.selectedOptions].map((o) => o.value)
                );
              }}
            >
              {data.players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.battleTag}
                </option>
              ))}
            </select>
          </p>
        </div>
        {playersSelected.map((playerId) => (
          <div key={playerId}>
            <p>
              <label htmlFor={`playerHero-${playerId}`}>
                Who did{' '}
                {data.players
                  .find((p) => p.id === playerId)
                  ?.battleTag.split('#')[0]
                  ?.replace(/^\w/, (c) => c.toUpperCase())}
                {` `} play? (select all heroes played):
              </label>
            </p>
            <p>
              <select
                multiple
                name={`playerHero-${playerId}`}
                id={`playerHero-${playerId}`}
                value={playerHeroes[playerId]}
                onChange={(e) => {
                  setPlayerHeroes({
                    ...playerHeroes,
                    [playerId]: [...e.target.selectedOptions].map(
                      (o) => o.value
                    ),
                  });
                }}
              >
                {data.heroes.map((hero) => (
                  <option key={hero.id} value={hero.id}>
                    {hero.name}
                  </option>
                ))}
              </select>
            </p>
          </div>
        ))}
        <div>
          <p>
            <label htmlFor="date">Date Played: </label>
            <input type="date" name="date" id="date" />
          </p>
        </div>
        <div>
          <label htmlFor="vibe">
            Player vibe: <input type="range" name="vibe" min="1" max="5" />
          </label>
        </div>
        <div>
          <label htmlFor="comment">
            Comments: <textarea name="comment" id="comment" />
          </label>
        </div>
        <div>
          {actionData?.formError ? (
            <p role="alert">{actionData.formError}</p>
          ) : null}
          <button type="submit">Add</button>
        </div>
      </Form>
    </div>
  );
}
