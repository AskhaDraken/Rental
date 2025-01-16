/*
  Warnings:

  - You are about to drop the column `type` on the `Tv` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Tv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "picture" TEXT;

-- AlterTable
ALTER TABLE "Rental" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "alamat" DROP NOT NULL,
ALTER COLUMN "mapurl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tv" DROP COLUMN "type",
ADD COLUMN     "jam" JSONB[],
ADD COLUMN     "roomId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "description" TEXT,
    "type" "RoomType" NOT NULL DEFAULT 'Standart',
    "price" INTEGER NOT NULL,
    "rentalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
