import { redirect, type ActionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export async function action({ request }: ActionArgs) {
  return await authenticator.logout(request, {
    redirectTo: '/login',
  });
}

export async function loader() {
  return redirect('/dashboard');
}
