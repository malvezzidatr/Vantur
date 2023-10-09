/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ConfirmedUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfirmedUser_userId_key" ON "ConfirmedUser"("userId");
