// 'use client';
// import {signIn, useSession} from 'next-auth/react'
// import { redirect } from 'next/navigation';

// function Login() {
//       const { data: session, status } = useSession()

//       return (
//             <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
//                   <button className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded' onClick={() => 
//                         signIn("google")
//                         .then(() => {
//                               if (status === "authenticated") {
//                                     redirect("/");
//                               }
//                         })
//                         }>Sign in with Google</button>

//                   {/* <button className='cursor-pointer mt-2 bg-green-500 text-white px-4 py-2 rounded' onClick={() => signIn("facebook")}>Sign in with Facebook</button> */}
//             </div>
//       )
// }

// export default Login;








'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

function Login() {
  const { status } = useSession();

  // -----------------------------------------------------------------
  // 1. Redirect when the session becomes authenticated
  // -----------------------------------------------------------------
  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/');          // <-- go to home page
    }
  }, [status]);

  // -----------------------------------------------------------------
  // 2. Start the Google sign-in flow
  // -----------------------------------------------------------------
  const handleGoogleSignIn = async () => {
    // `redirect: false` prevents next-auth from doing its own redirect
    // so we can handle it ourselves (see the useEffect above).
    await signIn('google', { redirect: false });
  };

  // Show a tiny spinner while the session is being loaded
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <button
        onClick={handleGoogleSignIn}
        className="cursor-pointer rounded bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;