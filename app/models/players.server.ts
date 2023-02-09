import { db } from '~/utils/db.server';

export async function validatePlayerId(id: string) {
  const playerId = await db.player.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  if (!playerId) {
    throw new Error('Player not found');
  }
  return playerId.id.toString();
}
