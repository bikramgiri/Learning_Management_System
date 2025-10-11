// First: check whether user is logged in or not
// Then: check whether user is admin or not

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@/database/models/user.schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = async (req: NextRequest) => {
      const session = await getServerSession(authOptions);
      // // check whether user is logged in or not
      // if(!session){
      //       return NextResponse.json(
      //             {
      //                   message: "You must be logged in to perform this action"
      //             },
      //             {status: 401}
      //       );
      // }

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
      //check whether user is logged in or not and also check whether user is admin or not
      if(!session || session.user.role !== Role.Admin){
            return NextResponse.json(
                  {
                        message: "You must be logged in as an admin to perform this action"
                  },
                  {status: 401}
            );
      }
}

const checkLoggedInOrNot = async (req: NextRequest) => {
      const session = await getServerSession(authOptions);
      //check whether user is logged in or not
      if(!session){
            return NextResponse.json(
                  {
                        message: "You must be logged in to perform this action"
                  },
                  {status: 401}
            );
      }
}

export default authMiddleware;
export { checkLoggedInOrNot };
