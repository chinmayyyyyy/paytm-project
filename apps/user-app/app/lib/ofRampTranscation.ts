"use server"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";


export async function createOfRampTransaction(
    bankAccount : String ,
    accountNo : String ,
    ifsc : String ,
    amount : number
){

    const session = await getServerSession(authOptions);    
    if(!session?.user || !session.user?.id){
        return{
            message : "Unathorized Access"
        }
    }

    const token = (Math.random() * 1000).toString();
    try {
        await prisma.ofRampTransaction.create({
            data:{
                bankAccount,
                status: "Processing",
                startTime: new Date(),
                token: token,
                accountNo : accountNo,
                amount: amount * 100 ,
                userId : Number(session?.user?.id)
            }
        })
    } catch (error) {
        console.log(error);
        return {
            message :  "Error in creating transaction"
        }
    }
}