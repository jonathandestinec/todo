"use server"

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { GetUser } from "../auth/getUser";

export async function GetTodos() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { user } = await GetUser()

    const { data, error } = await supabase
        .from('todos')
        .select()
        .eq('user_id', user?.id)
        .order('id', { ascending: false })

    return { data, error }
}