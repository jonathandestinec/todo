"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, email: string) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


    let { data, error } = await supabase.auth.resetPasswordForEmail(email)

    return NextResponse.json({ data, error })

}