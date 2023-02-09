import { db } from '~/utils/db.server';

export async function validateMapId(id: string): Promise<string> {
  const mapId = await db.map.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  if (!mapId) {
    throw new Error('Map not found');
  }
  return mapId.id.toString();
}

export async function getMapNameById(id: string): Promise<string> {
  const mapName = await db.map.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
  if (!mapName) {
    throw new Error('Map not found');
  }
  return mapName.name.toString();
}
