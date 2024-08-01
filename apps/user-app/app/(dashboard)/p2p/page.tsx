import { SendCard } from "../../../components/SendCard";
import TxnCard from "../../../components/txnCard";



export default async function (){              
        return <div className="w-screen grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <SendCard />
                <TxnCard/>
        </div>
}