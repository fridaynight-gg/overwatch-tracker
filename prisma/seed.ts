import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

function getUser() {
  return [
    {
      name: 'dekinaiyo',
      email: 'makesnodollars@gmail.com',
      password: 'password123',
      accounts: {
        create: {
          battleTag: 'dekinaiyo#1449',
          roleRank: {
            damage: 'platinum',
            tank: 'gold',
          },
        },
      },
    },
  ];
}

function getMap() {
  return [
    { name: 'Blizzard World', type: 'Hybrid' },
    { name: "King's Row", type: 'Hybrid' },
    { name: 'Numbani', type: 'Hybrid' },
    { name: 'Havana', type: 'Escort' },
    { name: 'Junkertown', type: 'Escort' },
    { name: 'Rialto', type: 'Escort' },
    { name: 'Route 66', type: 'Escort' },
    { name: 'Watchpoint: Gibraltar', type: 'Escort' },
    { name: 'Busan', type: 'Control' },
    { name: 'Ilios', type: 'Control' },
    { name: 'Lijiang Tower', type: 'Control' },
    { name: 'Nepal', type: 'Control' },
    { name: 'Oasis', type: 'Control' },
    { name: 'Esperança', type: 'Push' },
    { name: 'Midtown', type: 'Hybrid' },
    { name: 'Colosseo', type: 'Push' },
    { name: 'New Queen Street', type: 'Push' },
    { name: 'Paraíso', type: 'Hybrid' },
    { name: 'Shambali', type: 'Escort' },
  ];
}

function getHero() {
  return [
    {
      name: 'Baptiste',
      role: 'Support',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Ashe',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Bastion',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Doomfist',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Echo',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Genji',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Hanzo',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Junkrat',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Cassidy',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Mei',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Pharah',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Reaper',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Soldier: 76',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Sombra',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Tracer',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Torbjorn',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Widowmaker',
      role: 'Damage',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Ana',
      role: 'Support',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Brigitte',
      role: 'Support',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Lúcio',
      role: 'Support',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Mercy',
      role: 'Support',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Moira',
      role: 'Support',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Zenyatta',
      role: 'Support',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'D.Va',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Orisa',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Ramattra',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Reinhardt',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Roadhog',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Sigma',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Winston',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
    {
      name: 'Wrecking Ball',
      role: 'Tank',
      avatarImgUrl: 'https://i.imgur.com/5if5n5H.png',
    },
  ];
}

function getMatchHistory() {
  return [
    {
      location: {
        connect: {
          id: 1,
        },
      },
      user: {
        connect: {
          id: 'cldoqhovf0000yoy2bl0bw32c',
        },
      },
      hero: {
        connect: [{ id: 1 }, { id: 9 }, { id: 19 }],
      },
      matchResult: 'Win',
      gameMode: 'Quick Play',
      matchDate: new Date('2023-02-04'),
      account: {
        connect: {
          id: 'cldoqhovf0001yoy2h4jpng2j',
        },
      },
      comment: 'chillin',
      playerVibe: 4,
    },
    {
      location: {
        connect: {
          id: 2,
        },
      },
      user: {
        connect: {
          id: 'cldoqhovf0000yoy2bl0bw32c',
        },
      },
      hero: {
        connect: [{ id: 19 }, { id: 30 }],
      },
      matchResult: 'Loss',
      gameMode: 'Competitive',
      matchDate: new Date('2023-02-04'),
      account: {
        connect: {
          id: 'cldoqhovf0001yoy2h4jpng2j',
        },
      },
      comment: 'on fire',
      playerVibe: 2,
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
      return db.map.create({
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

async function seedMatchHistory() {
  await Promise.all(
    getMatchHistory().map((matchHistory) => {
      return db.matchHistory.create({
        data: matchHistory,
      });
    })
  );
}

async function seed() {
  // await seedUser();
  // await seedMap();
  // await seedHero();
  await seedMatchHistory();
}

seed();
