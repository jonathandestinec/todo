"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function Reset(email: string) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    if (!email) {
        console.log("Empty email")
        return { error: "Invalid email"}
    }

    else {
        let { data, error } = await supabase.auth.resetPasswordForEmail(
            email, {
            redirectTo: '/new-password',
        })

        console.log(error)

        return { data, error: error?.message }
    }

}