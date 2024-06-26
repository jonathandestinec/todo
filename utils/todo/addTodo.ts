"use server"

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";
import { GetUser } from "../auth/getUser";

export async function AddTodo(todo: string) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {user} = await GetUser()

    const { error } = await supabase
        .from('todos')
        .insert({ todo: todo, user_id: user?.id })

    return { error }
}