import { json } from '@remix-run/node';
import { Link, useLoaderData, Outlet } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader = async () => {
  return json({
    matchHistoryListItems: await db.match.findMany({
      include: { location: true },
    }),
  });
};

export default function MatchesRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <header>
        <div>
          <h1>
            <Link
              to="/"
              title="Overwatch Tracker"
              aria-label="Overwatch Tracker"
            >
              <span>📈 OWT</span>
            </Link>
          </h1>
        </div>
      </header>
      <main>
        <div>
          <div>
            <Link to=".">Random Match</Link>
            <p>Here are some recent matches:</p>
            <ul>
              {data.matchHistoryListItems.map((match) => (
                <li key={match.id}>
                  <Link to={match.id}>
                    {match.location.name} - {match.matchResult} -{' '}
                    {match.matchDate.split('T')[0]}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="new">Add New Match</Link>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
