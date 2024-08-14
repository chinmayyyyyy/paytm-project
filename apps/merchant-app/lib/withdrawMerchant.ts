"use server"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function withdrawMerchant(
    bankAccount: string,
    accountNo: string,
    amount: number
) {
    const session = await getServerSession(authOptions);    
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthorized Access"
        };
    }
    const userbalance = await prisma.balance.findFirst({
        where: {
            merchantId: Number(session.user.id)
        }
    });

    if (!userbalance || userbalance.amount < amount) {
        return {
            message: "Insufficient balance"
        };
    }

    const token = (Math.random() * 1000).toString();
    try {
        await prisma.merchantOfRampTransaction.create({
            data: {
                bankAccount,
                status: "Processing",
                startTime: new Date(),
                token: token,
                accountNo: accountNo,
                amount: amount * 100, 
                merchantId: Number(session.user.id)
            }
        });

        await prisma.balance.update({
            where: {
                merchantId: Number(session.user.id)
            },
            data: {
                amount: {
                    decrement: amount * 100
                },
                locked: {
                    increment: amount * 100
                }
            }
        });

        return {
            message: "Withdrawal initiated successfully"
        };
    } catch (error) {
        console.log(error);
        return {
            message: "Error in creating transaction"
        };
    }
}
