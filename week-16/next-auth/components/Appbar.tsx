"use client";
import { signIn, signOut } from "next-auth/react"

export const Appbar = () => {
    return <div>
    <button className=" border-2 border-gray-300 px-6 py-2 m-3 rounded-lg hover:bg-slate-800" onClick={() => signIn()}>Signin</button>
    <button className=" border-2 border-gray-300 px-6 py-2 m-3 rounded-lg hover:bg-slate-800" onClick={() => signOut()}>Sign out</button>
  </div>
} 
