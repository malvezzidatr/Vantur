/*
  Warnings:

  - Made the column `file` on table `Travel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Travel" ALTER COLUMN "file" SET NOT NULL;
