"use server"

import { revalidateTag } from "next/cache"


//we will revalidate i.e reload the page if request has "todos" tag
export default async function revalidateTodosTag() {
    revalidateTag("todos")
}