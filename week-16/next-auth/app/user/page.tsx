import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"

/*
    NOTE:servser cide component does not have access to session id in normal next auth, so we move it into an another file and import it like this so that we can have access to user id in session
*/
export default async function user(){
    const info = await getServerSession(NEXT_AUTH)

    return <div>
        I am a server component
        {JSON.stringify(info)}
    </div>
}