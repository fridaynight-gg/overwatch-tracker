import { FormStrategy } from 'remix-auth-form';
import { z } from 'zod';
import type { UserSession } from '~/services/auth.server';
import { verifyPassword } from '~/services/auth.server';
import { db } from '~/services/db.server';

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(1),
});

export const formStrategy = {
  name: 'user-pass',
  strategy: new FormStrategy<UserSession>(async ({ form }) => {
    const { username, password } = schema.parse({
      username: form.get('username'),
      password: form.get('password'),
    });

    const user = await db.user.findUnique({
      where: { username: username.toLocaleLowerCase() },
      select: { id: true, username: true, passwordHash: true },
    });

    if (!user) {
      throw new Error('User does not exist');
    }

    if (!user.passwordHash) {
      throw new Error('This user does not have a password set');
    }

    if (await verifyPassword(password, user.passwordHash)) {
      return {
        id: user.id,
        username: user.username,
      };
    }

    throw new Error('Invalid password');
  }),
};
