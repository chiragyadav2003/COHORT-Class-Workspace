import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                username:{ label:"Username", type:"text", placeholder:"Email" },
                password:{ label:"Password", type:"password", placeholder:"Password" }
            },
            async authorize(credentials:any){
                console.log(credentials)

                // const username = credentials.username,
                // const password = credentials.password,
                // const user = await prisma.user.findOne({email:username ,password:password})

                return {
                    id:"user1",
                    email:credentials.username,
                    name:"Chirag Yadav"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        signIn:({user})=>{
            console.log('signinn emmail', user.email)
            if(user.email==='random@gmail.com'){
                console.log('email', user.email)
                return false
            }
            return true
        }
    }
        
})

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