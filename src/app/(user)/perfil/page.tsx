"use client";

import Loader from "@/components/utils/loader";
import { useSession } from "next-auth/react";
import React from "react";
import usePerfil from "./usePerfil";
import BioInputText from "./components/textBio";

export default function Perfil() {
    const {
        user, status,
        username, setUsername,
        editUsername, setEditUsername,
        bio, lenBio, setBio,
        editBio, setEditBio,
        activeEdit, handlerActiveEdit,
        handleSave,
    } = usePerfil()

    if (status === "loading") {
        return <Loader />
    }

    console.log({ user, username, bio })

    return (
        <section className="w-full">
            <div className="min-h-scree w-full text-white">
                <header className="flex items-center justify-between p-4 border-b">
                    <div className="inline-flex">
                        {
                            activeEdit ?
                                <div>
                                    <button className="mr-3 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-9 rounded-md px-3 text-verde-claro border-verde-claro hover:text-white hover:bg-verde-claro" onClick={handleSave}>
                                        Guardar
                                    </button>
                                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-9 rounded-md px-3 text-rose-500 border-rose-500 hover:bg-rose-500 hover:text-white" onClick={() => handlerActiveEdit(false)}>
                                        Cancelar
                                    </button>
                                </div>
                                :
                                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input h-9 rounded-md px-3 hover:text-verde-claro hover:border-verde-claro" onClick={() => handlerActiveEdit(true)}>
                                    Editar perfil
                                </button>
                        }
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10">
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
                                className="w-6 h-6"
                            >
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10">
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
                                className="w-6 h-6"
                            >
                                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                            </svg>
                        </button>
                    </div>
                </header>
                <main className="p-4">
                    <div className="relative overflow-hidden">
                        <div className="absolute top-0 -left-3 w-24 h-24 rounded-full bg-morado shadow-xl"></div>
                        <div className="absolute top-0 left-5 w-10 h-10 rounded-full bg-verde-claro shadow-lg"></div>
                        <div className="absolute right-5 bottom-8 w-44 h-44 rounded-full bg-verde shadow-2xl"></div>
                        <div className="absolute right-20 bottom-0 w-44 h-44 rounded-full bg-morado shadow-2xl"></div>

                        <div
                            className="backdrop-filter backdrop-blur-md bg-opacity-100 font-notojp flex flex-col md:flex-row md:items-center md:justify-between p-6 rounded-xl shadow"
                            data-v0-t="card"
                        >

                            <div className="flex items-center space-x-4">
                                <img
                                    src={user?.image || "default.svg"}
                                    alt="Profile"
                                    className="rounded-full w-24 h-24"
                                    width="100"
                                    height="100"
                                    style={{ aspectRatio: 100 / 100, objectFit: "cover" }}
                                />
                                <div>
                                    <p className="text-sm text-muted-foreground">{user?.name}</p>
                                    {
                                        activeEdit ?
                                            <input type="text" maxLength={20} className="text-2xl font-bold bg-transparent border-b border-b-morado" value={editUsername} onChange={(v) => setEditUsername(v.target.value || '')} />
                                            :
                                            <h1 className="text-2xl font-bold">{username}</h1>

                                    }
                                    <p className="text-sm text-muted-foreground flex items-center space-x-2">
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
                                            className="w-4 h-4"
                                        >
                                            <path d="M8 2v4"></path>
                                            <path d="M16 2v4"></path>
                                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                            <path d="M3 10h18"></path>
                                        </svg>
                                        <span>Joined 3 years ago · last seen in the past day</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div dir="ltr" data-orientation="horizontal" className="w-full">
                            <div
                                data-state="active"
                                data-orientation="horizontal"
                                role="tabpanel"
                                aria-labelledby="radix-:r6:-trigger-about"
                                id="radix-:r6:-content-about"
                                tabIndex={0}
                                className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 py-4 duration-75"
                            >
                                <h2 className="text-xl font-bold">Bio</h2>
                                {
                                    activeEdit ?
                                        <BioInputText bio={editBio} lenBio={lenBio} handleChangeBio={(v) => setEditBio(v.target.value)} />
                                        :
                                        <p className="mt-2 text-muted-foreground">{bio || 'This is the bio section'}.</p>

                                }
                            </div>
                        </div>
                    </div>
                </main>
                <div className="bg-card rounded-lg shadow-sm p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm font-medium text-card-foreground">Social</div>
                        <a className="text-xs text-muted-foreground hover:underline" href="#">
                            Settings
                        </a>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
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
                                    className="w-5 h-5 text-card-foreground"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-card-foreground">@johndoe</div>
                                <div className="text-xs text-muted-foreground">Twitter profile</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
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
                                    className="w-5 h-5 text-card-foreground"
                                >
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect width="4" height="12" x="2" y="9"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-card-foreground">John Doe</div>
                                <div className="text-xs text-muted-foreground">LinkedIn profile</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}