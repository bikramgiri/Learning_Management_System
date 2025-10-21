// import NextAuth, { AuthOptions, Session } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// // import FacebookProvider from "next-auth/providers/facebook";
// import connectDB from "@/database/connection";
// import User from "@/database/models/user.schema";

// export const authOptions:AuthOptions = {
//       providers: [
//             GoogleProvider({
//                   clientId: process.env.GOOGLE_CLIENT_ID as string,
//                   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//             }),
//             // FacebookProvider({
//             //       clientId: process.env.FACEBOOK_CLIENT_ID as string,
//             //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
//             // })
//       ],
//       secret: process.env.NEXTAUTH_SECRET,
//       callbacks: {
//             async signIn({user}:{user : {email: string; name: string; image: string; id: string;}}): Promise<boolean> {
//                   try {
//                         await connectDB();
//                         // check if user already exists
//                         const userExists = await User.findOne({email: user.email});
//                         if (!userExists) {
//                               // create a new user
//                               await User.create({
//                                     username: user.name,
//                                     email: user.email,
//                                     googleId: user.id,
//                                     profileImage: user.image
//                               });
//                         }
//                         return true; // Return true to indicate successful sign-in
//                   } catch (error) {
//                         console.log("Error in signIn callback:", error);
//                         return false; // Return false to indicate sign-in failure
//                   }
//             },
//             async session({session,user}:{session:Session, user:{id: string}}){
//                   const data = await User.findById(user.id);
//                   session.user.role = data.role || "student";
//                   return session;
//             }
//       }
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }



import NextAuth, { AuthOptions, Session } from 'next-auth';
import { } from "next-auth"; // to include the module augmentation
import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
import connectDB from '@/database/connection';
import User from '@/database/models/user.schema';

interface IToken { name: string, email: string, picture: string, sub: string, id: string, role: string }
//@ts-ignore
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID as string,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
//     }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }: { user: { email: string; name?: string; image?: string; id: string } }): Promise<boolean> {
      try {
        await connectDB();
        const userExists = await User.findOne({ email: user.email });
        if (!userExists) {
          await User.create({
            username: user.name || 'Unknown',
            email: user.email,
            googleId: user.id,
            profileImage: user.image || '',
          });
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token }: { token: IToken }) {
      await connectDB();
      const user = await User.findOne({
        email: token.email
      });
      if (user) {
        token.id = user._id;
        token.role = user.role;
      }
      return token;
      },

    async session({ session, token }: { session: Session, token: IToken }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

//@ts-ignore
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };

// export default NextAuth(authOptions);