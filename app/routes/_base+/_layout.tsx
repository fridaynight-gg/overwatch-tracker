import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { UserSession } from '~/services/auth.server';
import { authenticator } from '~/services/auth.server';
import { Navigation } from './Navigation';

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as UserSession;
  return json({
    user,
  });
};

export default function BaseLayout() {
  return <Navigation />;
}
