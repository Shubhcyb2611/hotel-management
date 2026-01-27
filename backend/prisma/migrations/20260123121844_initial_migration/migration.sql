-- CreateTable
CREATE TABLE "Room" (
    "roomNumber" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomNumber")
);
