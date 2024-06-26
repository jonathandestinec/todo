"use client"

import React, { FormEvent, useState } from 'react'
import { Signup } from '@/utils/auth/signup'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

function page() {

    const {toast} = useToast()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e:FormEvent) => {

        e.preventDefault()

        const {data, error} = await Signup({email, password})

        if (error) {
            toast({
                title: "Error!",
                description: error,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Success",
                description: "You have Signed Up. You can Login now"
            })

            router.replace("/login")
        }
    }

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Create an account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-5 pr-5 box-border" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-5 pr-5 box-border" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>Sign Up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page