-- AlterTable
ALTER TABLE "page_contents" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
