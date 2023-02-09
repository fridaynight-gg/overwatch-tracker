import { db } from '~/utils/db.server';

export async function validateHeroId(id: string): Promise<string> {
  const heroId = await db.hero.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  if (!heroId) {
    throw new Error('Hero not found');
  }
  return heroId.id.toString();
}

export async function getHeroNameById(id: string) {
  const heroName = await db.hero.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
  if (!heroName) {
    throw new Error('Hero not found');
  }
  return heroName.name.toString();
}
