"use server"

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

export async function DeleteTodo(id: number) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    const response = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

    return { response }
}