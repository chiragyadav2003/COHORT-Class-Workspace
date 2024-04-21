import { NextResponse } from 'next/server'

let requestCount = 0;
export function middleware() {
    requestCount++;
    console.log("number of requests is ", requestCount);
    return NextResponse.next()
}