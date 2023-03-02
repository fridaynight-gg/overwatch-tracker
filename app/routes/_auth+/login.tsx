import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useTransition,
} from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { Button, getButtonClassname } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input } from '~/components/Input';
import { LoadingSpinner } from '~/components/LoadingSpinner';
import { StatusMessage } from '~/components/StatusMessage';
import { useShowSpinner } from '~/hooks/useShowSpinner';
import { authenticator } from '~/services/auth.server';
import {
  getStatusMessageFromSession,
  sessionStorage,
} from '~/services/session.server';

import overwatch_logo from '~/images/overwatch_logo.svg';

export const meta: MetaFunction = () => ({
  description: 'Login to submit your own matches to Overwatch Tracker!',
  title: 'Overwatch Tracker | Login',
});

export async function action({ request }: ActionArgs) {
  const clonedRequest = request.clone();
  const formData = await request.formData();
  const intention = formData.get('intent') as string;

  return await authenticator.authenticate(intention, clonedRequest, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  });
}

export async function loader({ request }: LoaderArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const authenticationError = session.get(authenticator.sessionErrorKey);

  const statusMessage = getStatusMessageFromSession(session);

  return json(
    // We do not want to send the actual error down to the client to avoid
    // leaking information about users that do or do not exist on the
    // site. Convert it to truthy value instead.
    { errors: Boolean(authenticationError), statusMessage },
    {
      // We have to set the `Set-Cookie` header on the return so that
      // the authenticator's error key is unset.
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    }
  );
}

interface SignInFormControlsCollection extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: SignInFormControlsCollection;
}

export default function SignInPage() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  const formRef = useRef<SignInFormElement>(null);
  const submittedIntent = transition?.submission?.formData.get(
    'intent'
  ) as string;

  const showSpinner = useShowSpinner(transition.state === 'submitting');

  useEffect(() => {
    if (!formRef.current) return;
    if (transition.state !== 'idle') return;
    if (!loaderData.errors) return;

    formRef.current.elements.username?.focus();
  }, [transition.state, loaderData.errors]);

  return (
    <div className="min-h-full items-center justify-center py-12 px-4 sm:px-6">
      <div className="space-y-8">
        <Link
          prefetch="intent"
          to="/"
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <img
            className="mx-auto h-24 w-auto md:h-32"
            src={overwatch_logo}
            alt="Overwatch Tracker"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Overwatch Tracker
        </h2>
      </div>
      <Card elevation="lg">
        <div className="flex flex-col gap-y-4">
          <Form className="space-y-4" ref={formRef} method="post">
            <Input
              inputProps={{
                autoFocus: true,
                id: 'username',
                placeholder: 'rockstargamer99',
                required: true,
                type: 'text',
              }}
              label="Username"
              name="username"
            />
            <Input
              inputProps={{
                id: 'password',
                required: true,
                type: 'password',
              }}
              label="Password"
              name="password"
            />
            {loaderData.statusMessage ? (
              <StatusMessage type={loaderData.statusMessage.type}>
                {loaderData.statusMessage.message}
              </StatusMessage>
            ) : null}
            {loaderData.errors ? (
              <StatusMessage type="error">
                There was an error signing in. Please try again.
              </StatusMessage>
            ) : null}
            <div className="flex items-center justify-between">
              <Link
                prefetch="intent"
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
              <Button
                disabled={showSpinner}
                leftIcon={
                  submittedIntent === 'user-pass' && showSpinner ? (
                    <LoadingSpinner />
                  ) : null
                }
                name="intent"
                value="user-pass"
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </Form>
        </div>
      </Card>
      <div className="mt-4 text-center">
        <Link
          prefetch="intent"
          to="/sign-up"
          className={getButtonClassname({ size: 'xs', variant: 'outline' })}
        >
          Don't have an account? Create one
        </Link>
      </div>
    </div>
  );
}

// function validateUrl(url: string | undefined) {
//   let urls = ['/matches', '/'];
//   if (url === undefined) {
//     return '/matches';
//   } else if (urls.includes(url)) {
//     return url;
//   }
//   return '/matches';
// }

// export const action = async ({ request }: ActionArgs) => {
//   const form = await request.formData();
//   const loginType = form.get('loginType');
//   const username = form.get('username');
//   const password = form.get('password');
//   const redirectTo = validateUrl(form.get('redirectTo')?.toString());

//   if (
//     typeof loginType !== 'string' ||
//     typeof username !== 'string' ||
//     typeof password !== 'string' ||
//     typeof redirectTo !== 'string'
//   ) {
//     return badRequest({
//       fieldErrors: null,
//       fields: null,
//       formError: `Form not submitted correctly.`,
//     });
//   }

//   const fields = { loginType, username, password };
//   const fieldErrors = {
//     username: validateUsername(username),
//     password: validatePassword(password),
//   };
//   if (Object.values(fieldErrors).some(Boolean)) {
//     return badRequest({
//       fieldErrors,
//       fields,
//       formError: null,
//     });
//   }

//   switch (loginType) {
//     case 'login': {
//       // login to get the user
//       // if there's no user, return the fields and a formError
//       const user = await login({ username, password });
//       console.log({ user });
//       if (!user) {
//         return badRequest({
//           fieldErrors: null,
//           fields,
//           formError: `Username/Password combination is incorrect`,
//         });
//       }
//       // if there is a user, create their session and redirect to /jokes
//       return createUserSession(user.id, redirectTo);
//     }
//     case 'register': {
//       const userExists = await db.user.findFirst({
//         where: { username },
//       });
//       if (userExists) {
//         return badRequest({
//           fieldErrors: null,
//           fields,
//           formError: `User with username ${username} already exists`,
//         });
//       }
//       // create the user
//       // create their session and redirect to /jokes
//       const user = await register({ username, password });
//       if (!user) {
//         return badRequest({
//           fieldErrors: null,
//           fields,
//           formError: `Something went wrong trying to create a new user.`,
//         });
//       }
//       return createUserSession(user.id, redirectTo);
//     }
//     default: {
//       return badRequest({
//         fieldErrors: null,
//         fields,
//         formError: `Login type invalid`,
//       });
//     }
//   }
// };

// export default function Login() {
//   const actionData = useActionData<typeof action>();
//   const [searchParams] = useSearchParams();
//   return (
//     <div className="container">
//       <div className="content" data-light="">
//         <h1>Login</h1>
//         <Form method="post">
//           <input
//             type="hidden"
//             name="redirectTo"
//             value={searchParams.get('redirectTo') ?? undefined}
//           />
//           <fieldset>
//             <legend className="sr-only">Login or Register?</legend>
//             <label>
//               <input
//                 type="radio"
//                 name="loginType"
//                 value="login"
//                 defaultChecked={
//                   !actionData?.fields?.loginType ||
//                   actionData?.fields?.loginType === 'login'
//                 }
//               />{' '}
//               Login
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="loginType"
//                 value="register"
//                 defaultChecked={actionData?.fields?.loginType === 'register'}
//               />{' '}
//               Register
//             </label>
//           </fieldset>
//           <div>
//             <label htmlFor="username-input">Username</label>
//             <input
//               type="text"
//               id="username-input"
//               name="username"
//               defaultValue={actionData?.fields?.username}
//               aria-invalid={Boolean(actionData?.fieldErrors?.username)}
//               aria-errormessage={
//                 actionData?.fieldErrors?.username ? 'username-error' : undefined
//               }
//             />
//             {actionData?.fieldErrors?.username ? (
//               <p
//                 className="form-validation-error"
//                 role="alert"
//                 id="username-error"
//               >
//                 {actionData.fieldErrors.username}
//               </p>
//             ) : null}
//           </div>
//           <div>
//             <label htmlFor="password-input">Password</label>
//             <input
//               id="password-input"
//               name="password"
//               type="password"
//               defaultValue={actionData?.fields?.password}
//               aria-invalid={Boolean(actionData?.fieldErrors?.password)}
//               aria-errormessage={
//                 actionData?.fieldErrors?.password ? 'password-error' : undefined
//               }
//             />
//             {actionData?.fieldErrors?.password ? (
//               <p
//                 className="form-validation-error"
//                 role="alert"
//                 id="password-error"
//               >
//                 {actionData.fieldErrors.password}
//               </p>
//             ) : null}
//           </div>
//           <div id="form-error-message">
//             {actionData?.formError ? (
//               <p className="form-validation-error" role="alert">
//                 {actionData.formError}
//               </p>
//             ) : null}
//           </div>

//           <button type="submit" className="button">
//             Submit
//           </button>
//         </Form>
//       </div>
//       <div className="links">
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/matches">Matches</Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
