import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../lib/auth";
import HeroSection from "../components/HeroSection";
import Feature from "../components/Feature";
import Footer from "@repo/ui/Footer";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } 
  return <div>
      <HeroSection />
      <Feature />
      <Footer />
  </div>
}
