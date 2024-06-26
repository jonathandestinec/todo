"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
export async function Reset(email: string) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    const { data, error } = await supabase.auth.resetPasswordForEmail(`${email}`)

    console.log(error)

    return { data, error }

}