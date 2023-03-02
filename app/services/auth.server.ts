import bcrypt from 'bcryptjs';
import { type User } from '@prisma/client';
import { redirect } from '@remix-run/server-runtime';
import { Authenticator } from 'remix-auth';

import { formStrategy } from '~/auth/strategies/form';
import { flashStatusMessage, sessionStorage } from '~/services/session.server';
import { db } from './db.server';

export type UserSession = Pick<User, 'id' | 'username'>;

export const authenticator = new Authenticator<UserSession>(sessionStorage).use(
  formStrategy.strategy,
  formStrategy.name
);

type LoginForm = {
  username: string;
  password: string;
};

export async function register({ username, password }: LoginForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { username, passwordHash },
  });
  return { id: user.id, username };
}

export async function verifyPassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}
