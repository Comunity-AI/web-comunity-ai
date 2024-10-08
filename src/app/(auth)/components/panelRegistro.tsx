"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PanelRegistroProps {
    loginActive: boolean
    setLoginActive: (state: boolean) => void
}

export default function PanelRegistro({ loginActive, setLoginActive }:PanelRegistroProps) {
    const [nombres, setNombres] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, nombres, username, password }),
        });
        if (response.ok) {
            console.log("Registration successful");
            router.push('/perfil')
        } else {
            console.error("Registration failed");
        }
    };

    return (
        <div className={`flex-col justify-center flex-1 px-6 py-8 sm:px-12 lg:flex-none lg:px-20 xl:px-24 transition-all duration-300 ${loginActive ? 'hidden w-0 translate-x-full' : 'flex -translate-x-0 w-1/3'}`}>
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
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Únete ya!</h2>
                </div>
                <div className="mt-8">
                    <div className="mt-6">
                        <form id="form" className="space-y-6" onSubmit={handleRegister}>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="flex text-black h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                    type="text"
                                    placeholder="email@mail.com"
                                    required={true}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                />
                            </div>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="nombres"
                                >
                                    Nombres
                                </label>
                                <input
                                    className="flex text-black h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                    type="text"
                                    placeholder="Nombres"
                                    required={true}
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value)}
                                    name="nombres"
                                />
                            </div>
                            <div>
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    className="flex text-black h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                    type="text"
                                    placeholder="Username"
                                    required={true}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    name="username"
                                />
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="flex text-black h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    required={true}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name="password"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                        type="checkbox"
                                        aria-hidden="true"
                                        tabIndex={-1}
                                        value="on"
                                    />
                                    <label
                                        className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2 block text-sm text-gray-900 dark:text-gray-100"
                                        htmlFor="remember-me"
                                    >
                                        Recordarme
                                    </label>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className="dark:text-gray-200 mr-3">Ya tienes una cuenta?</p>
                                <div className="text-sm">
                                    <a className="font-medium text-blue-600 hover:text-blue-500" href="#" onClick={()=>setLoginActive(true)}>
                                        Inicia Sesion
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white dark:text-slate-900 bg-slate-900 dark:bg-white text-primary-foreground hover:bg-slate-900/90 dark:hover:bg-white/90 h-10 px-4 py-2 w-full"
                                    type="submit"
                                >
                                    Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-6 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-100">O continuar con</span>
                    </div>
                </div>
                <div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div>
                            <button
                                onClick={() => signIn('google')}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:text-gray-200 hover:bg-slate-950 hover:text-accent-foreground h-10 px-4 py-2 w-full">
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
                                    className="w-5 h-5 mr-3"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <line x1="21.17" x2="12" y1="8" y2="8"></line>
                                    <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
                                    <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
                                </svg>
                                Google
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => signIn('github')}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:text-gray-100 hover:bg-slate-950 hover:text-violet-600/90 h-10 px-4 py-2 w-full">
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
                                    className="w-5 h-5 mr-3"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                                GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}