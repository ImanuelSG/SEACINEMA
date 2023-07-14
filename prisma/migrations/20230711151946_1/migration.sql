/*
  Warnings:

  - You are about to drop the `balance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_movieId_fkey";

-- DropForeignKey
ALTER TABLE "balance" DROP CONSTRAINT "balance_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "amount" INT4 NOT NULL;
ALTER TABLE "Transaction" ALTER COLUMN "movieId" DROP NOT NULL;
ALTER TABLE "Transaction" ALTER COLUMN "watchdate" DROP NOT NULL;
ALTER TABLE "Transaction" ALTER COLUMN "watchtime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" INT4 NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "balance";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
