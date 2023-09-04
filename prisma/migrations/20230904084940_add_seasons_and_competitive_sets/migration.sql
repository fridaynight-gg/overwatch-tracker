-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "seasonId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "name" SET DEFAULT 'Season 0';
