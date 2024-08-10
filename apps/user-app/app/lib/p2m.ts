"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";
import redisClient from "@repo/redis-service"

export async function p2mTxn(merchantId:number , amount:number ) {
    console.log("Payment started");

    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if(!from){
        console.log("Invalid User");
        return {
            message: "Invalid User"
        };
    }

    const toUser = await prisma.merchant.findFirst({
        where: {
            id: merchantId
        }
    });

    if(!toUser){
        console.log("Merchant not found");
        return {
            message: "Merchant not found"
        };
    }

    try {
        await prisma.$transaction(async (tx) => {
            console.log("Transaction started");

            // Ensure the balance record exists for the user
            let fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) }
            });


            if (fromBalance.amount < amount) {
                console.log("Insufficient funds");
                throw new Error('Insufficient funds');
            }

            console.log(`User has sufficient funds: ${fromBalance.amount}`);

            // Ensure the balance record exists for the merchant
            let toBalance = await tx.balance.findUnique({
                where: { userId: toUser.id }
            });

            // Decrement balance from the user
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } }
            });
            console.log(`User balance decremented by: ${amount}`);

            // Increment balance for the merchant
            await tx.balance.update({
                where: { merchantId: toUser.id },
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
         //sending message to redis queue
         const message = JSON.stringify({
            merchantId: toUser.id,
            amount: amount,
            message: `Paytm received ${amount} Rs from ${session.user.name}`
        });

        await redisClient.lPush('payments_queue', message);

        console.log("Transaction Successful");

        return {
            message: "Payment successful"
        };
    } catch(e) {
        console.error("Error during transaction:", e.message);
        return {
            message: `Error while sending: ${e.message}`
        };
    }
}
