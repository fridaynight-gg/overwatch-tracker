import { Form, Link } from '@remix-run/react';
import { Button } from '~/components/Button';

interface MatchDisplayData {
  id: string;
  gameMode: string;
  matchResult: string;
  playerVibe: number;
  comment: string | null;
  location: { name: string; type: string };
  attackFirst: boolean | null;
  createdAt: string;
  account: {
    battleTag: string;
    heroes: { hero: { name: string; id: string } }[];
  }[];
}

export function MatchDisplay({
  canDelete = true,
  isOwner,
  match,
}: {
  canDelete?: boolean;
  isOwner: boolean;
  match: MatchDisplayData;
}) {
  return (
    <div>
      <h2>Match Details</h2>
      <p>
        {match.gameMode} {match.matchResult} on {match.location.name}:
      </p>
      {match.account.map((player) => (
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
        Map Type: {match.location.type}, Attack First:{' '}
        {match.attackFirst ? 'Yes' : 'No'}
      </p>
      <p>Vibes out of 5: {match.playerVibe}</p>
      <p>Comments: {match.comment}</p>
      <p>Played on: {match.createdAt.split('T')[0]}</p>
      <Link to=".">
        Match: {match.gameMode} on {match.location.name} Permalink{' '}
      </Link>
      {isOwner ? (
        <Form method="post">
          <Button
            disabled={!canDelete}
            name="intent"
            type="submit"
            value="delete"
          >
            Delete
          </Button>
        </Form>
      ) : null}
    </div>
  );
}
