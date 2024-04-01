import { NextRequest, NextResponse } from "next/server";


/*NOTE: 
    - { params: { authRoutes } }: The second parameter is destructured to access the authRoutes property from the params object.
    - { params: { authRoutes: string } }: This is a TypeScript type annotation specifying the expected structure of the second parameter. It indicates that the second parameter should be an object with a params property, which itself should be an object with an authRoutes property of type string. 
*/
export function GET(req:NextRequest, {params:{authRoutes}}:{params:{authRoutes:string}}){
    console.log(authRoutes)
    return NextResponse.json({
        msg:"this route uses nextAuth "
    })
}