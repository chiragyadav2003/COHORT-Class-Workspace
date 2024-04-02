"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export const Appbar = () => {
  const session = useSession()
    return <div className="flex flex-col justify-center items-center w-full ">
    <button className=" border-2 border-gray-300 px-6 py-2 m-3 rounded-lg hover:bg-slate-800 w-[150px]" onClick={() => signIn()}>Signin</button>
    <button className=" border-2 border-gray-300 px-6 py-2 m-3 rounded-lg hover:bg-slate-800 w-[150px]" onClick={() => signOut()}>Sign out</button>
    <div>
      {JSON.stringify(session)}
    </div>
    
  </div>
} 
