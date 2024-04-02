import { getServerSession } from "next-auth"


export default async function user(){
    const info = await getServerSession()

    return <div>
        I am a server component
        {JSON.stringify(info)}
    </div>
}