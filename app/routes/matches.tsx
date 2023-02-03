import { Outlet } from '@remix-run/react';

export default function MatchesRoute() {
  return (
    <div>
      <h1>Recent Matches</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
