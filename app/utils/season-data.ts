import axios from 'axios';
import * as cheerio from 'cheerio';
import { convertStringToNumber } from './numbers';

const currentLiveSeason = 2;

const getCurrentSeason = async (): Promise<string> => {
  const response = await axios.get(
    'https://overwatch.blizzard.com/en-us/season/'
  );
  const $ = cheerio.load(response.data);
  const season = ($('meta[property="og:title"]').attr('content') ?? '').match(
    /Season (\d+)/
  )?.[1];

  if (!season) {
    throw new Error('Season not found on page, check if the page has changed');
  }
  console.log(`We're in Season ${season}`);
  return season;
};

async function validateSeason(currentLiveSeason: number): Promise<Boolean> {
  if (currentLiveSeason !== convertStringToNumber(await getCurrentSeason())) {
    return true;
  }
  return false;
}

export async function updateSeason() {
  if (await validateSeason(currentLiveSeason)) {
    // update season value in your database here
    console.log(
      `Current season updated to Season ${convertStringToNumber(
        await getCurrentSeason()
      )} in database`
    );
  } else {
    console.log('Season not updated');
  }
}
