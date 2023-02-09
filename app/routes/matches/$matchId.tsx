import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { db } from '~/utils/db.server';

export const loader = async ({ params }: LoaderArgs) => {
  const match = await db.match.findUnique({
    where: { id: params.matchId },
    include: {
      location: true,
      account: {
        select: {
          battleTag: true,
          id: true,
          heroes: {
            select: {
              hero: true,
            },
            where: {
              matchId: {
                equals: params.matchId,
              },
            },
          },
        },
      },
    },
  });
  if (!match) {
    throw new Error('Match not found');
  }

  return json({ match });
};

export default function MatchRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>Match Details</h2>
      <p>
        {data.match.gameMode} {data.match.matchResult} on{' '}
        {data.match.location.name}:
      </p>
      {data.match.account.map((player) => (
        <div key={player.battleTag}>
          <p>
            {player.battleTag
              .split('#')[0]
              ?.replace(/^\w/, (c) => c.toUpperCase())}{' '}
            played:
          </p>
          {player.heroes.map((heroItem) => (
            <p key={heroItem.hero.id}>{heroItem.hero.name}</p>
          ))}
        </div>
      ))}
      <p>
        Map Type: {data.match.location.type}, Attack First:{' '}
        {data.match.attackFirst ? 'Yes' : 'No'}
      </p>
      <p>Vibes out of 5: {data.match.playerVibe}</p>
      <p>Comments: {data.match.comment}</p>
      <p>Played on: {data.match.matchDate.split('T')[0]}</p>
      <Link to=".">
        Match: {data.match.gameMode} on {data.match.location.name} Permalink{' '}
      </Link>
    </div>
  );
}
