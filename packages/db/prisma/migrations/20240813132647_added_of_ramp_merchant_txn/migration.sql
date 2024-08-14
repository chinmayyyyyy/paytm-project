-- CreateTable
CREATE TABLE "MerchantOfRampTransaction" (
    "id" SERIAL NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "MerchantOfRampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantOfRampTransaction_token_key" ON "MerchantOfRampTransaction"("token");

-- AddForeignKey
ALTER TABLE "MerchantOfRampTransaction" ADD CONSTRAINT "MerchantOfRampTransaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
