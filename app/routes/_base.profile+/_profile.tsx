import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { UserSession } from '~/services/auth.server';
import { authenticator } from '~/services/auth.server';
import { db } from '~/services/db.server';
import {
  getSession,
  getStatusMessageFromSession,
} from '~/services/session.server';

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as UserSession;
  const session = await getSession(request.headers.get('Cookie'));
  const statusMessage = getStatusMessageFromSession(session);

  const profileData = await db.user.findUnique({
    where: { id: user?.id },
  });
  return json(
    { profileData, statusMessage },
    { headers: { 'Set-Cookie': await sessionStorage.commitSession(session) } }
  );
};
