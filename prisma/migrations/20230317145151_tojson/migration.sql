/*
  Warnings:

  - The `metadata` column on the `responses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "responses" DROP COLUMN "metadata";
ALTER TABLE "responses" ADD COLUMN     "metadata" JSONB;
