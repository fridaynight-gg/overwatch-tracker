import { db } from '~/services/db.server';

export async function getUserById(id?: string) {
  if (!id) return null;

  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      accounts: true,
      matches: true,
    },
  });
}
