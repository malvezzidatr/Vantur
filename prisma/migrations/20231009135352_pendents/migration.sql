/*
  Warnings:

  - You are about to drop the `Participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ConfirmedUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PendingUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ConfirmedUsers" DROP CONSTRAINT "_ConfirmedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConfirmedUsers" DROP CONSTRAINT "_ConfirmedUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_PendingUsers" DROP CONSTRAINT "_PendingUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PendingUsers" DROP CONSTRAINT "_PendingUsers_B_fkey";

-- DropTable
DROP TABLE "Participants";

-- DropTable
DROP TABLE "_ConfirmedUsers";

-- DropTable
DROP TABLE "_PendingUsers";

-- CreateTable
CREATE TABLE "PendingUser" (
    "_id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "travelId" STRING NOT NULL,

    CONSTRAINT "PendingUser_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "PendingUser" ADD CONSTRAINT "PendingUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingUser" ADD CONSTRAINT "PendingUser_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
