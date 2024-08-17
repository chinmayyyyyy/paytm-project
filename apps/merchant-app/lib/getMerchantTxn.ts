import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";


export async function getMerchantTransactions() {
  const merchantId = 1005
  try {
    const transactions = await prisma.userToMerchantTransaction.findMany({
      where: {
        merchantId: merchantId,
      },
      select: {
        amount: true,
        timestamp: true,
        user : true
      },
    });
    const Merchtransactions = [
      ...transactions.map(t => ({ amount: t.amount/100, timestamp: t.timestamp, name : t.user.name })),
    ]

    return Merchtransactions;
  } catch (error) {
    console.error("Error fetching merchant transactions:", error);
    throw new Error("Could not fetch merchant transactions.");
  }
}


export async function getBalance() {
    const session = await getServerSession(authOptions);
        const balance = await prisma.balance.findFirst({
            where: {
                merchantId: Number(session?.user?.id)
            }
        });
        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        }
}