"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

export async function GET(res: NextResponse) {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let { error } = await supabase.auth.signOut()

    if (error) {
        return NextResponse.json(error.message)
    } else {
        redirect("/login")
    }

}