"use client";

import Navbar from "@/components/nav/navbar";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Complete() {
    const { data: session, status } = useSession()
    const [user, setUser] = useState({ username: "", pais: "" })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user) {
            const req = await fetch('/registro', {
                method: 'POST',
                body: JSON.stringify({
                    ...user,
                    // email: session?.user?.email
                })
            })
            const res = await req.json();
            if (!res.status) {
                return alert(res.message)
            }
            window.location.href = "/perfil"
        }
    }

    return (
        <section className="flex min-h-screen bg-[#f7f7f7] dark:bg-transparent">
            <div className="flex flex-col justify-center flex-1 px-6 py-8 sm:px-12 lg:flex-none lg:px-20 xl:px-24">
                <div className="w-full max-w-xl mx-auto lg:w-96">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-12 w-12 text-blue-600"
                        >
                            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                        </svg>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Ingresa a tu cuenta!</h2>
                    </div>
                    <div className="mt-8">
                        <div className="mt-6">
                            <form id="form" className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                        htmlFor="email"
                                    >
                                        Username
                                    </label>
                                    <input
                                        className="text-black flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                        type="text"
                                        placeholder="Username"
                                        required={true}
                                        name="username"
                                        onChange={e => setUser(p => ({ ...p, username: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                        htmlFor="pais"
                                    >
                                        Pais
                                    </label>
                                    <input
                                        className="text-black flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                        type="text"
                                        id="pais"
                                        placeholder="Password"
                                        required={true}
                                        name="password"
                                        onChange={e => setUser(p => ({ ...p, pais: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="border border-verde text-verde bg-transparent hover:bg-verde/80 hover:text-white p-3 rounded-lg w-full">Completar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}