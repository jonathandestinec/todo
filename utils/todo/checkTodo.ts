"use server"

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

export async function CheckTodo(id: number, checked: boolean) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    console.log(checked)

    const { error } = await supabase
        .from('todos')
        .update({ completed: checked })
        .eq('id', id)

    return { error }
}