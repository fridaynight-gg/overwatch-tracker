import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  Form,
  Link,
  useCatch,
  useLoaderData,
  useParams,
} from '@remix-run/react';
import { MatchDisplay } from '~/routes/_base.matches+/$id/MatchDisplay';
import type { UserSession } from '~/services/auth.server';
import { authenticator } from '~/services/auth.server';

import { db } from '~/services/db.server';
import {
  getSession,
  getStatusMessageFromSession,
  sessionStorage,
} from '~/services/session.server';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return {
      title: 'No match',
      description: 'No match found',
    };
  }
  return {
    title: `Match on "${data.match.location.name}"`,
    description: `View the results of the match on "${data.match.location.name}"`,
  };
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as UserSession;
  const session = await getSession(request.headers.get('Cookie'));
  const statusMessage = getStatusMessageFromSession(session);
  const match = await db.match.findUnique({
    where: { id: params.id },
    include: {
      location: true,
      account: {
        select: {
          battleTag: true,
          id: true,
          heroes: {
            select: {
              hero: true,
            },
            where: {
              matchId: {
                equals: params.id,
              },
            },
          },
        },
      },
    },
  });
  if (!match) {
    throw new Response('Unlucky, match not found.', {
      status: 404,
    });
  }

  return json(
    { match, isOwner: match.createdBy === user.id, statusMessage },
    {
      headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
    }
  );
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as UserSession;
  if (form.get('intent') !== 'delete') {
    throw new Response(`The intent ${form.get('intent')} is not supported`, {
      status: 400,
    });
  }
  const userId = user.id;
  const match = await db.match.findUnique({
    where: { id: params.id },
  });
  if (!match) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }
  if (match.createdBy !== userId) {
    throw new Response(
      "You can't delete this match because you didn't create it.",
      { status: 403 }
    );
  }
  await db.heroesPlayedByPlayer.deleteMany({ where: { matchId: params.id } });
  await db.match.delete({ where: { id: params.id } });
  return redirect('/matches');
};

export default function MatchRoute() {
  const data = useLoaderData<typeof loader>();

  return <MatchDisplay isOwner={data.isOwner} match={data.match} />;
}

export function ErrorBoundary() {
  const { id } = useParams();
  return (
    <div className="error-container">{`There was an error loading the match by the id ${id}. Sorry.`}</div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    case 404: {
      return (
        <div className="error-container">
          What you're looking for cannot be found: {params.id} is not a valid
          match.
        </div>
      );
    }
    case 403: {
      return (
        <div className="error-container">
          Sorry, but {params.id} is not your match.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}
