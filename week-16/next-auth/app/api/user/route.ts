import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const info = await getServerSession()
    return NextResponse.json({info})
}