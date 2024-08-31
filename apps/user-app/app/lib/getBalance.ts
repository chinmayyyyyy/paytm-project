import { getServerSession } from "next-auth";
import prisma from "../../../../packages/db";
import { authOptions } from "./auth";

interface Balance {
    amount: number;
    locked: number;
}

export default async function getBalance(): Promise<Balance> {

    const session = await getServerSession(authOptions);

    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}