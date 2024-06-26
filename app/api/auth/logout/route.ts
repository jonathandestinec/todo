"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"

export async function GET(req: NextRequest) {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    let { error } = await supabase.auth.signOut()

    if (error) {
        return NextResponse.json(error.message)
    } else {
        redirect("/login")
    }

}