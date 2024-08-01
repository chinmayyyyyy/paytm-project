import { getServerSession  } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";
import { RecentTransaction } from "./recentTransaction";


async function getSentTxn() {
    // fetch the data here 
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
            where : {
                    fromUserId : Number(session?.user?.id)
            },
            include: {
                    toUser: true
                }
    });
    return txns.map(t => ({
            time: t.timestamp,
            amount: t.amount,
            toUser: {
                    id: t.toUser.id,
                    name: t.toUser.name
                }
    }))
    
}
async function getRecivedTxn() {
    // fetch the data here 
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
            where : {
                    toUserId : Number(session?.user?.id)
            },
            include: {
                    fromUser: true
                }
    });
    return txns.map(t => ({
            time: t.timestamp,
            amount: t.amount,
            fromUser:  {
                    id: t.fromUser.id,
                    name: t.fromUser.name
                }
    }))
}

export default async function(){
    
    const sentTxn = await getSentTxn();
    const recivedTxn = await getRecivedTxn();

    return (
        <div className="pt-4">
               < RecentTransaction transactions={sentTxn}  title="Sent Transactions"   />
               <br />
               < RecentTransaction transactions={recivedTxn} title="Received Transactions" />               
        </div>
 
)}