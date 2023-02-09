import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Outlet, Scripts } from '@remix-run/react';
import styles from './styles/app.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Overwatch Tracker',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Overwatch Tracker</title>
        <Links />
      </head>
      <body className="bg-slate-100 text-gray-900">
        <Outlet />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
