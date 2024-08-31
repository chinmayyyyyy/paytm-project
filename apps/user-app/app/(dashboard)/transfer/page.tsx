import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import isAuth from "../isAuth";
import { redirect } from 'next/navigation';
import getBalance from "../../lib/getBalance";

interface Balance {
    amount: number;
    locked: number;
}

enum OnRampStatus {
    Success,
    Failure,
    Processing,
}
interface OnRampTransaction {
    time: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
}


async function getOnRampTransactions(): Promise<OnRampTransaction[]> {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t:any) => ({
        time: t.startTime,
        amount: t.amount,
        status: OnRampStatus[t.status as keyof typeof OnRampStatus],
        provider: t.provider
    }));
}

export default async function TransferPage() {
    const user = await isAuth(); // Check if the user is authenticated
    if (!user) {
        console.log('User not authenticated');
        redirect('api/auth/signin');
    }

    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}

