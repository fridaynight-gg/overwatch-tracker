import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData, Outlet, Form } from '@remix-run/react';
import type { UserSession } from '~/services/auth.server';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import {
  getSession,
  getStatusMessageFromSession,
  sessionStorage,
} from '~/services/session.server';

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as UserSession;
  const session = await getSession(request.headers.get('Cookie'));
  const statusMessage = getStatusMessageFromSession(session);
  const matchHistoryListItems = await db.match.findMany({
    take: 50,
    orderBy: { createdAt: 'asc' },
    include: { location: true },
    where: { createdBy: user?.id },
  });
  return json(
    {
      matchHistoryListItems,
      user,
      statusMessage,
    },
    {
      headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
    }
  );
};

export default function MatchesRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>
        Hey, this is the dashboard! We'll show your progress today, this
        competative set, and this season for both quickplay and competative
      </p>
    </div>
  );
}
