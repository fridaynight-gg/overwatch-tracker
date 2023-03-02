import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  useActionData,
  useLoaderData,
  Form,
  useCatch,
  Link,
} from '@remix-run/react';
import { useState } from 'react';
import { Button } from '~/components/Button';
import type { UserSession } from '~/services/auth.server';
import { authenticator } from '~/services/auth.server';

import { db } from '~/services/db.server';
import { badRequest } from '~/services/request.server';
import { getSession } from '~/services/session.server';
import { convertStringToNumber as setVibe } from '~/utils/convertStringToNumber';

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as UserSession;
  if (!user) {
    throw new Response('Unauthorized', { status: 401 });
  }
  const maps = await db.map.findMany({});
  const heroes = await db.hero.findMany({});
  const players = await db.player.findMany({});
  return json({ maps, heroes, players });
};

function validateMatchMap(map: string) {
  if (!map) {
    return 'Map is required';
  }
}

function validateMatchGameMode(gameMode: string) {
  if (!gameMode) {
    return 'Game mode is required';
  }
}

function validateMatchResult(matchResult: string) {
  if (!matchResult) {
    return 'Match result is required';
  }
}

function validateMatchVibe(vibe: string) {
  if (!vibe) {
    return 'Vibe is required';
  }
}

function validatePlayerHeroes(playerHeroes: { [key: string]: string[] }) {
  if (!playerHeroes) {
    return 'Player heroes are required';
  }
}

function validateSelectedPlayers(selectedPlayers: string[]) {
  if (!selectedPlayers) {
    return 'Selected players are required';
  }
}

export const action = async ({ request }: ActionArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as UserSession;
  const form = await request.formData();
  const map = form.get('map');
  const gameMode = form.get('gamemode');
  const attackFirst = form.get('attackFirst');
  const matchResult = form.get('result');
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

  if (
    typeof map !== 'string' ||
    typeof gameMode !== 'string' ||
    typeof matchResult !== 'string' ||
    typeof vibe !== 'string' ||
    typeof comment !== 'string' ||
    typeof playerHeroes !== 'object' ||
    typeof selectedPlayers !== 'object'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  function convertToBoolean(attackFirst: FormDataEntryValue | null) {
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

  function selectedPlayersData(
    selectedPlayers: string[]
  ): Array<{ id: string }> {
    const playersData = [];

    for (const player of selectedPlayers) {
      playersData.push({ id: player });
    }

    return playersData;
  }

  const fieldErrors = {
    location: validateMatchMap(map),
    gameMode: validateMatchGameMode(gameMode),
    matchResult: validateMatchResult(matchResult),
    playerVibe: validateMatchVibe(vibe),
    heroes: validatePlayerHeroes(playerHeroes),
    account: validateSelectedPlayers(selectedPlayers),
  };

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
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const match = await db.match.create({
    data: { ...fields, user: { connect: { id: user.id } } },
  });

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
              defaultValue={actionData?.fields?.account?.connect?.map(
                (p) => p.id
              )}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.account) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.account ? 'account-error' : undefined
              }
              onChange={(e) => {
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
          {actionData?.fieldErrors?.account ? (
            <p
              className="form-validation-error"
              role="alert"
              id="account-error"
            >
              {actionData.fieldErrors.account}
            </p>
          ) : null}
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
          <label htmlFor="vibe">
            Player vibe:{' '}
            <input
              defaultValue={actionData?.fields?.playerVibe}
              type="range"
              name="vibe"
              min="1"
              max="5"
              aria-invalid={Boolean(actionData?.fieldErrors?.playerVibe)}
              aria-errormessage={
                actionData?.fieldErrors?.playerVibe ? 'playerVibe' : undefined
              }
            />
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
          <Button type="submit">Add</Button>
        </div>
      </Form>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return (
      <div className="error-container">
        <p>You must be logged in to create a match.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export function ErrorBoundary() {
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
