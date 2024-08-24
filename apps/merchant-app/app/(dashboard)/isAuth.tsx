import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


export default async function isAuth(){
    const user = await getServerSession(authOptions);

    if(!user?.user?.id){
        return false;
    }
    else{
        return true;
    }
}