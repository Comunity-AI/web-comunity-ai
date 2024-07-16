  
import Navbar from "@/components/nav/navbar";

import { getServerSession } from 'next-auth/next';
import {authOptions} from "@/app/api/auth/[...nextauth]/route"

export default async function Registro(){    
    const session = await getServerSession(authOptions);

    return (

        <div className="text-white">{session?.user?.email}</div>
    )
}