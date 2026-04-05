-- AlterTable
ALTER TABLE "site_settings" ADD COLUMN     "mapLatitude" TEXT,
ADD COLUMN     "mapLongitude" TEXT,
ADD COLUMN     "mapZoom" INTEGER DEFAULT 15;
