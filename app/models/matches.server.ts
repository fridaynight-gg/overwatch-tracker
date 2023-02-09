import { db } from '~/utils/db.server';

export function setPlayerVibe(vibe: string) {
  const vibeInt = parseInt(vibe);
  return vibeInt;
}

export function setDateTime(date: string): Date {
  const dateTime = new Date(date);
  return dateTime;
}
