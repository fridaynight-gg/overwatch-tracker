import { updateCurrentSeason } from './scheduled/update-current-season.cron.server';

// Can put any other jobs here as well should we come across some.

export async function initializeJobs() {
  console.log('Initializing jobs...');
  await updateCurrentSeason();
}
