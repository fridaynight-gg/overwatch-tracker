import type { MetaFunction, LinksFunction, LoaderArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Outlet,
  useCatch,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { getUserById } from './models/user';
import { authenticator, UserSession } from './services/auth.server';
import { getSession } from './services/session.server';
import styles from './styles/app.css';

export const meta: MetaFunction = () => {
  const description = `Track your Overwatch match history and stats`;
  return {
    charset: 'utf-8',
    description,
    viewport: 'width=device-width,initial-scale=1',
    keywords: 'overwatch,stats,tracker',
    'twitter:image': 'https://overwatch-tracker.vercel.app/og-image.png',
    'twitter:card': 'summary_large_image',
    'twitter:create': '@calebandersen',
    'twitter:site': '@calebandersen',
    'twitter:title': 'Overwatch Tracker',
    'twitter:description': description,
  };
};

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet preload', href: styles, as: 'style' },
  {
    rel: 'stylesheet preload',
    href: 'https://rsms.me/inter/inter.css',
    as: 'style',
  },
  {
    rel: 'stylesheet preload',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap',
    as: 'style',
  },
];

export async function loader({ request }: LoaderArgs) {
  const authenticatedUser = (await authenticator.isAuthenticated(
    request
  )) as UserSession | null;

  const session = await getSession(request.headers.get('Cookie'));
  const userResult = await getUserById(authenticatedUser?.id);
  return {
    user: { userResult },
    // theme: session?.theme,
  };
}

export type LoaderData = typeof loader;

function Document({
  children,
  title = `Overwatch Tracker`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en" className="h-full bg-slate-100">
      <head>
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body className="h-full overflow-hidden font-sans text-gray-800">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Uh-oh!">
      <div>
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
