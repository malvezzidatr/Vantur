-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" TEXT NOT NULL,
    "departure_location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "ownerId" TEXT,
    "file" TEXT NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "PendingUser" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,

    CONSTRAINT "PendingUser_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ConfirmedUser" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,

    CONSTRAINT "ConfirmedUser_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingUser" ADD CONSTRAINT "PendingUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingUser" ADD CONSTRAINT "PendingUser_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedUser" ADD CONSTRAINT "ConfirmedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedUser" ADD CONSTRAINT "ConfirmedUser_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
