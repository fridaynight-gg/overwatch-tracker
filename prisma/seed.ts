import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcryptjs';

const db = new PrismaClient();

const salt = genSaltSync(10);
const hash = hashSync('password123', salt);

function getUser() {
  return [
    {
      username: 'dekinaiyo',
      passwordHash: hash,
      accounts: {
        create: {
          battleTag: 'dekinaiyo#1732',
          roleRank: {
            damage: 'platinum 4',
            tank: 'gold 2',
            support: 'diamond 2',
          },
        },
      },
    },
    {
      username: 'radium',
      passwordHash: hash,
      accounts: {
        create: {
          battleTag: 'radium#11220',
          roleRank: {
            damage: 'diamond 4',
            tank: 'gold 5',
            support: 'masters 5',
          },
        },
      },
    },
  ];
}

function getMap() {
  return [
    {
      name: 'Circuit Royal',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/10/Monte_Carlo.jpg',
    },
    {
      name: 'Dorado',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/ec/Dorado-streets2.jpg',
    },
    {
      name: 'Blizzard World',
      type: 'Hybrid',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f8/Blizzard_World.jpg',
    },
    {
      name: "King's Row",
      type: 'Hybrid',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1b/King%27s_Row_concept.jpg',
    },
    {
      name: 'Numbani',
      type: 'Hybrid',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1b/Numbani_Loading_Screen.jpg',
    },
    {
      name: 'Hollywood',
      type: 'Hybrid',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/2/26/Hollywood-set.jpg',
    },
    {
      name: 'Havana',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/93/Havana.png',
    },
    {
      name: 'Junkertown',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/e3/Junkertown.jpg',
    },
    {
      name: 'Rialto',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/ff/Rialto.jpg',
    },
    {
      name: 'Route 66',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/a6/Route_66.jpg',
    },
    {
      name: 'Watchpoint: Gibraltar',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/8/8b/Gibraltar.jpg',
    },
    {
      name: 'Busan',
      type: 'Control',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/09/Overwatch_Busan.jpg',
    },
    {
      name: 'Ilios',
      type: 'Control',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/45/Ilios.jpg',
    },
    {
      name: 'Lijiang Tower',
      type: 'Control',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/9b/Lijiang_Tower_loading_screen.jpg',
    },
    {
      name: 'Nepal',
      type: 'Control',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f3/Nepal_loading_screen.jpg',
    },
    {
      name: 'Oasis',
      type: 'Control',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/fc/Oasis.jpg',
    },
    {
      name: 'Esperança',
      type: 'Push',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f5/PortugalPush.jpg',
    },
    {
      name: 'Midtown',
      type: 'Hybrid',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/4e/N18S6DCTDPG81613669123002.png',
    },
    {
      name: 'Colosseo',
      type: 'Push',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1e/Blizzconline_rome_01.png',
    },
    {
      name: 'New Queen Street',
      type: 'Push',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/91/Toronto.jpg',
    },
    {
      name: 'Paraíso',
      type: 'Hybrid',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/90/Para%C3%ADso_pvp.jpg',
    },
    {
      name: 'Shambali Monastery',
      type: 'Escort',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/8/81/ShambaliEscort.png',
    },
    {
      name: 'Antarctic Peninsula',
      type: 'Control',
      mapImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/7c/Antarctic_Peninsula_1.png',
    },
  ];
}

function getHero() {
  return [
    {
      name: 'Baptiste',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/fb/Icon-Baptiste.png',
    },
    {
      name: 'Ashe',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/b/be/Icon-Ashe.png',
    },
    {
      name: 'Bastion',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/51/Icon-Bastion.png',
    },
    {
      name: 'Doomfist',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/a1/Icon-Doomfist.png',
    },
    {
      name: 'Kiriko',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/c/ca/Icon-kiriko.png',
    },
    {
      name: 'Echo',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d6/Icon-Echo.png',
    },
    {
      name: 'Genji',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1c/Icon-Genji.png',
    },
    {
      name: 'Hanzo',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/71/Icon-Hanzo.png',
    },
    {
      name: 'Junkrat',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/99/Icon-Junkrat.png',
    },
    {
      name: 'Cassidy',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/05/Icon-Cassidy.png',
    },
    {
      name: 'Mei',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/9/99/Icon-Mei.png',
    },
    {
      name: 'Pharah',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/2/29/Icon-Pharah.png',
    },
    {
      name: 'Reaper',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/a9/Icon-Reaper.png',
    },
    {
      name: 'Soldier: 76',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Sombra',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/70/Icon-Sombra.png',
    },
    {
      name: 'Tracer',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/2/29/Icon-Tracer.png',
    },
    {
      name: 'Torbjorn',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/c/ca/Icon-Torbj%C3%B6rn.png',
    },
    {
      name: 'Widowmaker',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/54/Icon-Widowmaker.png',
    },
    {
      name: 'Sojourn',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/e0/Icon-Sojourn.png',
    },
    {
      name: 'Symmetra',
      role: 'Damage',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/06/Icon-Symmetra.png',
    },
    {
      name: 'Ana',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/3/3d/Icon-Ana.png',
    },
    {
      name: 'Brigitte',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/a/a6/Icon-Brigitte.png',
    },
    {
      name: 'Lúcio',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/51/Icon-L%C3%BAcio.png',
    },
    {
      name: 'Mercy',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/03/Icon-Mercy.png',
    },
    {
      name: 'Moira',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/5/55/Icon-Moira.png',
    },
    {
      name: 'Zenyatta',
      role: 'Support',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f7/Icon-Zenyatta.png',
    },
    {
      name: 'D.Va',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/19/Icon-D.Va.png',
    },
    {
      name: 'Orisa',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/11/Icon-Orisa.png',
    },
    {
      name: 'Ramattra',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/6/6f/Icon-Ramattra.png',
    },
    {
      name: 'Reinhardt',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/8/83/Icon-Reinhardt.png',
    },
    {
      name: 'Roadhog',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/16/Icon-Roadhog.png',
    },
    {
      name: 'Sigma',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/e/e0/Icon-Sigma.png',
    },
    {
      name: 'Winston',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f8/Icon-Winston.png',
    },
    {
      name: 'Wrecking Ball',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/c/ca/Icon-Wrecking_Ball.png',
    },
    {
      name: 'Zarya',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/75/Icon-Zarya.png',
    },
    {
      name: 'Junker Queen',
      role: 'Tank',
      avatarImgUrl:
        'https://static.wikia.nocookie.net/overwatch_gamepedia/images/2/2b/Icon-Junker_Queen.png',
    },
  ];
}

async function seedUser() {
  await Promise.all(
    getUser().map((user) => {
      return db.user.create({
        data: user,
      });
    })
  );
}

async function seedMap() {
  await Promise.all(
    getMap().map((map) => {
      return db.overwatchMap.create({
        data: map,
      });
    })
  );
}

async function seedHero() {
  await Promise.all(
    getHero().map((hero) => {
      return db.hero.create({
        data: hero,
      });
    })
  );
}

async function seed() {
  await seedUser();
  await seedMap();
  await seedHero();
}

seed();
