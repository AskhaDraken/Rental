-- CreateTable
CREATE TABLE "rental" (
    "id" TEXT NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "picture" TEXT,
    "description" VARCHAR(500) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "mapurl" VARCHAR(255) NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,

    CONSTRAINT "rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv" (
    "id" TEXT NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "tv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galleryTable" (
    "id" TEXT NOT NULL,
    "rentalId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,

    CONSTRAINT "galleryTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "rentalId" TEXT NOT NULL,
    "playStatus" BOOLEAN NOT NULL,
    "orderStatus" BOOLEAN NOT NULL,
    "statusPembayaran" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileInfoTable" (
    "id" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "bio" VARCHAR(500) NOT NULL,
    "user" VARCHAR(255) NOT NULL,

    CONSTRAINT "profileInfoTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jam" (
    "id" INTEGER NOT NULL,
    "open" TEXT NOT NULL,
    "close" TEXT NOT NULL,

    CONSTRAINT "jam_pkey" PRIMARY KEY ("id")
);
