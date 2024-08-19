"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";
import redisClient from "@repo/redis-service";

export async function p2mTxn(merchantId: number, amount: number) {
    console.log("Payment started");

    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
        console.log("Invalid User");
        return { message: "Invalid User" };
    }

    const toUser = await prisma.merchant.findFirst({
        where: { id: merchantId }
    });

    if (!toUser) {
        console.log("Merchant not found");
        return { message: "Merchant not found" };
    }

    const fromBalance = await prisma.balance.findUnique({
        where: { userId: Number(from) }
    });

    if (!fromBalance || fromBalance.amount < amount) {
        console.log("Insufficient funds");
        return { message: "Insufficient funds", success: false };

    }

    try {
        await prisma.$transaction(async (tx) => {
            console.log("Transaction started");

            // Decrement balance from the user
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } }
            });
            console.log(`User balance decremented by: ${amount}`);

            // Increment balance for the merchant
            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } }
            });
            console.log(`Merchant balance incremented by: ${amount}`);
        });

        // Log the transaction
        await prisma.userToMerchantTransaction.create({
            data: {
                amount: amount * 100, // Assuming the amount needs to be multiplied by 100
                timestamp: new Date(),
                userId: Number(from),
                merchantId: Number(toUser.id)
            }
        });
        console.log("Transaction record created");

        // Send a message to the Redis queue
        const message = JSON.stringify({
            merchantId: toUser.id,
            amount: amount,
            message: `Received ${amount} rupees from ${session.user.name}`
        });

        await redisClient.lPush('payments_queue', message);

        console.log("Transaction Successful");
        return { message: "Payment successful" };
    } catch (e: any) {
        console.error("Error during transaction:", e.message);
        return { message: `Error while sending: ${e.message}` };
    }
}
