'use client';
import {signIn, useSession} from 'next-auth/react'
import { redirect } from 'next/navigation';

function Login() {
      const { data: session, status } = useSession()

      return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
                  <button className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded' onClick={() => 
                        signIn("google")
                        .then(() => {
                              if (status === "authenticated") {
                                    redirect("/");
                              }
                        })
                        }>Sign in with Google</button>

                  {/* <button className='cursor-pointer mt-2 bg-green-500 text-white px-4 py-2 rounded' onClick={() => signIn("facebook")}>Sign in with Facebook</button> */}
            </div>
      )
}

export default Login;