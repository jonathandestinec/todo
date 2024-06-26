"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function Login(creds: { email: string, password: string }) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (creds.email && creds.password) {

        let { data, error } = await supabase.auth.signInWithPassword({
            email: creds.email,
            password: creds.password
        })

        return ({error, data})

    } else return {
        message: "No input provided"
    }

}