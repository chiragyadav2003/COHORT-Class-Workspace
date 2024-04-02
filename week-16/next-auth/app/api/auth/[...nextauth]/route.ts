import { NEXT_AUTH } from "@/app/lib/auth";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth(NEXT_AUTH)

export const GET = handler;
export const POST = handler;





























// import { NextRequest, NextResponse } from "next/server";


// /*NOTE: 
//     - { params: { authRoutes } }: The second parameter is destructured to access the authRoutes property from the params object.
//     - { params: { authRoutes: string[] } }: This type annotation specifies the expected structure of the second argument. It indicates that the params property should have a nested authRoutes property, which is expected to be an array of strings. 
// */
// export function GET(req:NextRequest, {params:{authRoutes}}:{params:{authRoutes:string[]}}){
//     console.log(authRoutes)
//     return NextResponse.json({
//         msg:"this route uses nextAuth "
//     })
// }