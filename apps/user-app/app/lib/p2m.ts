"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";




export async function p2mTxn(merchantId:number , amount:number ) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if(!from){
        return {
            message: "Invalid User"
        }
    }

    const toUser = await prisma.merchant.findFirst({
        where :{
            id : merchantId
        }
    });
    if(!toUser){        
        return {
            message: "Merchant not found"
        }
    }

    try {
        
        await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });
        }); 
        await prisma.userToMerchantTransaction.create({
            data:{
                amount : amount *100,
                timestamp : new Date(),
                userId : Number(from),
                merchantId : Number(toUser.id)
            }
        })
    }
    catch(e){
        return{
            message: "Error while sending"
        }
    }

}