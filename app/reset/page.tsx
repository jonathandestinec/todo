"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Reset } from '@/utils/auth/reset'
import { useToast } from '@/components/ui/use-toast'

function page() {

    const { toast } = useToast()

    const [email, setEmail] = useState("")

    const handleReset = async () => {
        const { error } = await Reset(email)

        if (error) {
            toast({
                title: "An Error occured",
                description: error.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Reset Link sent",
                description: "Check your email to reset password"
            })
        }
    }

    return (
        <div className="flex w-full ml-auto mr-auto h-screen items-center justify-center space-x-2">
            <div className=' w-2/4'>
                <h1 className=' text-2xl text-center mb-10 font-bold'>Reset your password</h1>
                <div className=' flex items-center justify-center gap-10'>
                    <Input type="email" placeholder="Email" className=' w-2/3' onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <Button type="submit" className=' w-1/4' onClick={handleReset}>Reset Password</Button>
                </div>
            </div>
        </div>
    )
}

export default page