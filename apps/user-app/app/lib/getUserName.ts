"use server"

import prisma from "@repo/db/client";

export async function getUserName(userNumber : string): Promise<string>{
    const userInfo = await prisma.user.findFirst({
        where :{
            number : userNumber
        }
    })
    if(!userInfo){
        return "user doesnt exist"
    }
    else{
        return userInfo.name ?? ""
    }

}