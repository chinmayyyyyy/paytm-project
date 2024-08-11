-- CreateTable
CREATE TABLE "OfRampTransaction" (
    "id" SERIAL NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "OfRampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OfRampTransaction_token_key" ON "OfRampTransaction"("token");

-- AddForeignKey
ALTER TABLE "OfRampTransaction" ADD CONSTRAINT "OfRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
