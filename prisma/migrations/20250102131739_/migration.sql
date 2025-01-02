/*
  Warnings:

  - You are about to drop the column `time` on the `Tv` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Tv` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Rental` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nomorUrut]` on the table `Tv` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `snapToken` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomorUrut` to the `Tv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `psId` to the `Tv` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PS" AS ENUM ('PS1', 'PS2', 'PS3', 'PS4', 'PS5');

-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "snapToken" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending',
ALTER COLUMN "isConfirm" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Tv" DROP COLUMN "time",
DROP COLUMN "user",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nomorUrut" INTEGER NOT NULL,
ADD COLUMN     "psId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PlayStation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "PS" NOT NULL,
    "price" INTEGER NOT NULL,
    "rentalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayStation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rental_userId_key" ON "Rental"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tv_nomorUrut_key" ON "Tv"("nomorUrut");

-- AddForeignKey
ALTER TABLE "PlayStation" ADD CONSTRAINT "PlayStation_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
