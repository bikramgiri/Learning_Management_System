import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import connectDB from "@/database/connection";
import User from "@/database/models/user.schema";

export const authOptions:AuthOptions = {
      providers: [
            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID as string,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            }),
            FacebookProvider({
                  clientId: process.env.FACEBOOK_CLIENT_ID as string,
                  clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
            })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
            async signIn({user}:{user : {email: string; name: string; image: string; id: string;}}): Promise<boolean> {
                  try {
                        await connectDB();
                        // check if user already exists
                        const userExists = await User.findOne({email: user.email});
                        if (!userExists) {
                              // create a new user
                              await User.create({
                                    username: user.name,
                                    email: user.email,
                                    googleId: user.id,
                                    profileImage: user.image
                              });
                        }
                        return true; // Return true to indicate successful sign-in
                  } catch (error) {
                        console.log("Error in signIn callback:", error);
                        return false; // Return false to indicate sign-in failure
                  }
            },
            async session({session,user}:{session: {user: {name: string; email: string; image: string; role?: string;};}; user: {id: string;};}) {
                  const data = await User.findById(user.id);
                  if(data){
                        session.user.role = data.role || "student";
                  }
                  return session;
            }
      }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }