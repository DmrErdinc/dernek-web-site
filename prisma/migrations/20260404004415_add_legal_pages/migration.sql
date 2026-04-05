/*
  Warnings:

  - You are about to drop the column `accountName` on the `donation_info` table. All the data in the column will be lost.
  - You are about to drop the `about_page` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "board_members" ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'male';

-- AlterTable
ALTER TABLE "donation_info" DROP COLUMN "accountName",
ADD COLUMN     "accountHolder" TEXT,
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "additionalInfo" TEXT,
ADD COLUMN     "cryptoAddress" TEXT;

-- AlterTable
ALTER TABLE "site_settings" ADD COLUMN     "siteDescription" TEXT,
ADD COLUMN     "whatsappNumber" TEXT;

-- DropTable
DROP TABLE "about_page";

-- CreateTable
CREATE TABLE "page_contents" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "mission" TEXT,
    "vision" TEXT,
    "history" TEXT,
    "values" TEXT,
    "goals" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_pages" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legal_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "page_contents_page_key" ON "page_contents"("page");

-- CreateIndex
CREATE UNIQUE INDEX "legal_pages_page_key" ON "legal_pages"("page");
