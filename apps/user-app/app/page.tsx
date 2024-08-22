"use client"
import HeroFunction from "../components/HeroSection";
import Feature from "../components/Feature";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { signIn , signOut  } from "next-auth/react";
import Footer from "../components/Footer";

export default  function Page() {
    const session = useSession();
    const router = useRouter()
     if(session.data?.user){
        redirect('/dashboard')
     }


  return <div>
        <HeroFunction onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("/api/auth/signin")
      }} user={session.data?.user}
        />
        <Feature />
        <Footer />
  </div>
}