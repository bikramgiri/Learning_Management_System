// First: check whether user is logged in or not
// Then: check whether user is admin or not

// import { Role } from "@/database/models/user.schema";
// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authMiddleware = async (req: NextRequest) => {
      // const session = await getServerSession(authOptions);
      // console.log("Session in middleware:", session);

      // Use getToken to verify JWT from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token in auth middleware:', token);
      // check whether user is logged in or not
      if(!token){
            return NextResponse.json(
                  {
                        message: "You must be logged in to perform this action"
                  },
                  {status: 401}
            );
      }
       return null;
      // return NextResponse.next();

      // // check whether user is admin or not
      // if(session.user.role !== Role.Admin){
      //       return NextResponse.json(
      //             {
      //                   message: "You are not authorized to perform this action"
      //             },
      //             {status: 403}
      //       );
      // }
      // return NextResponse.next();
      
      // *Combining both checks
      // //check whether user is logged in or not and also check whether user is admin or not
      // if(!session || session.user.role !== Role.Admin){
      //       return NextResponse.json(
      //             {
      //                   message: "You must be logged in as an admin to perform this action"
      //             },
      //             {status: 401}
      //       );
      // }

      // return NextResponse.next();
}

// const checkLoggedInOrNot = async (req: NextRequest) => {
//       const session = await getServerSession(authOptions);
//       // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//       // console.log('Token in checkLoggedInOrNot middleware:', token);
//       //check whether user is logged in or not
//       if(!session){
//             return NextResponse.json(
//                   {
//                         message: "You must be logged in to perform this action"
//                   },
//                   {status: 401}
//             );
//       }
//       return NextResponse.next();
// }

export default authMiddleware;
// export { checkLoggedInOrNot };
