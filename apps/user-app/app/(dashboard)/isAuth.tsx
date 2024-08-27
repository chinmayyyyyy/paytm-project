"use server"

import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

export default async function isAuth () {
        const session = await getServerSession(authOptions);        
         if(session?.user?.id){
            return true ;
         }else {
            return false ;
         }
    };

