/*
  Warnings:

  - A unique constraint covering the columns `[merchantId]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "merchantId" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UserToMerchantTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "merchantId" INTEGER NOT NULL,

    CONSTRAINT "UserToMerchantTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_merchantId_key" ON "Balance"("merchantId");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToMerchantTransaction" ADD CONSTRAINT "UserToMerchantTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToMerchantTransaction" ADD CONSTRAINT "UserToMerchantTransaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
