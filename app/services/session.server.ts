import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, Session } from '@remix-run/node';

import { db } from './db.server';
import { StatusType } from '~/components/StatusMessage';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'RJ_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export type StatusMessageFlash = {
  message: string;
  type: StatusType;
};

export function flashStatusMessage(
  session: Session,
  statusMessage: StatusMessageFlash
) {
  session.flash('statusMessage', statusMessage);
}

export function getStatusMessageFromSession(session: Session) {
  return session.get('statusMessage') as StatusMessageFlash | undefined;
}
