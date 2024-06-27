"use server"

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

export async function Signup(creds: { email: string, password: string }) {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    let { data, error } = await supabase.auth.signUp({
        email: creds.email,
        password: creds.password
    })

    return { data, error:error?.message }

}