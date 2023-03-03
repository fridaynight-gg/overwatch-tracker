import cron from 'node-cron';
import { updateSeason } from '~/utils/season-data';

export async function updateCurrentSeason() {
  cron.schedule(
    '04 11 * * *',
    // '*/30 * * * * *',
    async () => {
      console.log('Running "Update Current Season" job at 11:04am PST');
      await updateSeason();
    },
    {
      scheduled: true,
      timezone: 'America/Los_Angeles',
    }
  );
}
