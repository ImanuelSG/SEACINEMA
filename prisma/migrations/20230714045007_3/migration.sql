/*
  Warnings:

  - You are about to drop the column `watchdate` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `watchtime` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "watchdate";
ALTER TABLE "Transaction" DROP COLUMN "watchtime";
ALTER TABLE "Transaction" ADD COLUMN     "watchdatetime" TIMESTAMP(3);
