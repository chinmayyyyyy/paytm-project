import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<boolean> {
      if (!user || !user.email) {
        return false;
      }

      try {
        const merchant = await db.merchant.upsert({
          where: { email: user.email },
          create: {
            email: user.email,
            name: user.name || "",
            auth_type: account?.provider === "google" ? "Google" : "Github"
          },
          update: {
            name: user.name || "",
            auth_type: account?.provider === "google" ? "Google" : "Github"
          },
          select: {
            id: true,
          }
        });
        const balance = await db.balance.create({
                    data: {
                        amount: 2000,
                        locked : 0,
                        userId: merchant.id ,
                    }
              }) 
        user.id = String(merchant.id); // Ensure user object has the id
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, token, user }): Promise<typeof session> {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
};
