import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader = async () => {
  const count = await db.match.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomMatch] = await db.match.findMany({
    take: 1,
    skip: randomRowNumber,
    include: { location: true },
  });
  return json({ randomMatch });
};

export default function Matches() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>Random Match</h2>
      <p>
        {data.randomMatch.gameMode} - {data.randomMatch.location.name} -{' '}
        {data.randomMatch.matchResult} -{' '}
        {data.randomMatch.matchDate.split('T')[0]}
      </p>
      <p>
        <Link to={data.randomMatch.id}>
          Match on {data.randomMatch.location.name} Permalink
        </Link>
      </p>
    </div>
  );
}
