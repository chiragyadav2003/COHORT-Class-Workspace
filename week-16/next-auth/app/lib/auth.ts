import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const NEXT_AUTH = {
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
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID || "",
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
            }),
            GitHubProvider({
                clientId: process.env.GITHUB_ID ||"",
                clientSecret: process.env.GITHUB_SECRET||""
            })
        ],
        secret: process.env.NEXTAUTH_SECRET,
        callbacks:{
            signIn:({user}:any)=>{
                console.log('signin callback email', user.email)
                if(user.email==='random@gmail.com'){
                    console.log('blocked email',)
                    return false
                }
                return true
            },
            jwt:({token,user}:any)=>{
                token.userId = token.sub
                console.log("token callback toekn ", token);
    
                return token
            },
            session:({session,token,user}:any)=>{
                // console.log('session callback session ', session)
                if(session && session.user){
                    session.user.id = token.userId
                }
                console.log('session callback session ', session)
    
                return session
            }
        }
}