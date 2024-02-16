/*
  Warnings:

  - The `file` column on the `Travel` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "file",
ADD COLUMN     "file" TEXT[];
