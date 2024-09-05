import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function getOfRampTxn() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return [];
    }

    const txn = await prisma.merchantOfRampTransaction.findMany({
        where: {
            merchantId: Number(session.user.id),
        },
        select: {
            status: true,
            bankAccount: true,
            accountNo: true,
            startTime: true,
            amount: true,
        },
    });

    return txn as any;
}
