'use client';
import {signIn} from 'next-auth/react'

function SignUp() {
      return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
                  <button className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded' onClick={() => signIn("google")}>Sign up with Google</button>
                  <button className='cursor-pointer mt-2 bg-green-500 text-white px-4 py-2 rounded' onClick={() => signIn("facebook")}>Sign up with Facebook</button>
            </div>
      )
}

export default SignUp;