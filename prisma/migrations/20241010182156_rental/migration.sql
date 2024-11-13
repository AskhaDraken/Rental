/*
  Warnings:

  - You are about to drop the `galleryTable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profileInfoTable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rental` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tv` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "galleryTable";

-- DropTable
DROP TABLE "jam";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "profileInfoTable";

-- DropTable
DROP TABLE "rental";

-- DropTable
DROP TABLE "tv";

-- CreateTable
CREATE TABLE "Rental" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "picture" TEXT,
    "description" VARCHAR(500) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "mapurl" VARCHAR(255) NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tv" (
    "id" TEXT NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "time" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,

    CONSTRAINT "Tv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryTable" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,

    CONSTRAINT "GalleryTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playStatus" BOOLEAN NOT NULL,
    "orderStatus" BOOLEAN NOT NULL,
    "statusPembayaran" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailOrder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "tvId" TEXT NOT NULL,
    "jam" TEXT NOT NULL,

    CONSTRAINT "DetailOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileInfoTable" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "bio" VARCHAR(500) NOT NULL,

    CONSTRAINT "ProfileInfoTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DetailOrder_orderId_key" ON "DetailOrder"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileInfoTable_userId_key" ON "ProfileInfoTable"("userId");

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tv" ADD CONSTRAINT "Tv_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryTable" ADD CONSTRAINT "GalleryTable_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailOrder" ADD CONSTRAINT "DetailOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailOrder" ADD CONSTRAINT "DetailOrder_tvId_fkey" FOREIGN KEY ("tvId") REFERENCES "Tv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileInfoTable" ADD CONSTRAINT "ProfileInfoTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
