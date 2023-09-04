# Welcome to Overwatch Tracker!

Overwatch Tracker is a tool to track your Overwatch Match history and be able to do interesting analysis on those matches to get sick insights on your MMR and performance over time.

Current live version can be found at https://overwatch-tracker.fly.dev

## Techstack

Core tech and frameworks

- [React](https://reactjs.org/)
- [Remix](https://remix.run/)
- [Tailwind](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)

Libraries

- [Framer Motion](https://www.framer.com/motion/)
- [Zod](https://zod.dev/)

Environment

- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)

Deployment

- [Docker](https://www.docker.com/)
- [Fly.io](https://fly.io/)

## Getting Started

Clone the repo and switch to the develop branch run `npm install` to install all dependencies.

Make sure you have a postgres instance running on your machine and that you have a database called `overwatch_tracker` created. Edit your `.env` file with the correct credentials for your database instance so that the app can connect (see sampe.env for an example).

Next run `npx prisma migrate dev` to create the tables to seed the database with some initial data. This will seed data with the data found in the `prisma/seed.ts` file. In there you'll see the username and password of the default users that get created, you can add or update these as you see fit.

If you'd like to interact with the database through a UI, run `npx prisma studio`.

Then run `npm run dev` to start the dev server. You should be able to navigate to `localhost:3000` and see the app running.

You'll now be able to log in with the default users that were created in the seed step.

That's it for getting the project up and running locally!

## Contributing

If you've come across this project from the wild and you'd like contribute, please feel free to open a PR with your changes. We'll be happy to review and merge them in if they fit with the vision of the project.
