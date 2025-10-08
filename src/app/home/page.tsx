'use client';
import { signIn, signOut, useSession } from "next-auth/react";

function Home() {
  const {data:session} = useSession(); // useSelector()  --> select * from users
  if(session){
    return (
      <>
      <h1 className="text-3xl text-green-300 font-bold">Welcome, {session.user?.name}</h1>
      <h2 className="text-2xl text-indigo-400 font-semibold">{session.user?.email}</h2>
      <button className="bg-red-500 text-white cursor-pointer py-2 px-4 rounded" onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Not Logged In</h1>
      <button className="bg-blue-500 text-white cursor-pointer py-2 px-4 rounded" onClick={() => signIn()}>Sign In with Google</button>
    </div>
  )
}

export default Home;