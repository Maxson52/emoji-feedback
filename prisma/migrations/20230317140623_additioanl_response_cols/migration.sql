-- AlterTable
ALTER TABLE "responses" ADD COLUMN     "location" STRING;
ALTER TABLE "responses" ADD COLUMN     "metadata" STRING;
ALTER TABLE "responses" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
