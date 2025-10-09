import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import connectDB from "@/database/connection";
import User from "@/database/models/user.schema";

const handler = NextAuth({
      providers: [
            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID as string,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            }),
            // FacebookProvider({
            //       clientId: process.env.FACEBOOK_CLIENT_ID as string,
            //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
            // })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
            async signIn({user}): Promise<boolean> {
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
            }
      }
})

export { handler as GET, handler as POST }