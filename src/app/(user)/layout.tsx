"use client";

import ItemSB from "@/components/sidebar/itemSidebar";
import Sidebar from "@/components/sidebar/sidebar";
import BtnCrear from "@/components/sidebar/btnCrear";

import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { signOut } from "next-auth/react"

import { svgs_items } from "@/helpers/svgs"
import BtnSalir from "@/components/sidebar/btnSalir";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [tab, setTab] = useState("perfil");

  const handleTab = (e: MouseEvent<HTMLDivElement>, name: string) => {
    if(name == "Inicio") name = "perfil";
    if(tab == name) return;

    setTab(name);
    router.push(`/${name.toLowerCase()}`);
  }

  return (
    <section className="block md:flex h-screen relative">
      <Sidebar title="Comunity AI">
        <BtnCrear isCollapsed={false}/>
        <ItemSB icon={svgs_items.home} name="Inicio" onClick={handleTab} active={tab == "perfil"} />
        <ItemSB icon={svgs_items.datasets} name="Datasets" onClick={handleTab} active={tab == "Datasets"} />
        <ItemSB icon={svgs_items.cerebrito} name="Modelos" onClick={handleTab} active={tab == "Modelos"} />
        <ItemSB icon={svgs_items.paper} name="Papers" onClick={handleTab} active={tab == "Papers"} />
        <ItemSB icon={svgs_items.learn} name="Aprender" onClick={handleTab} active={tab == "Aprender"} />
        <BtnSalir handleClick={() => signOut()} isCollapsed={false} />
      </Sidebar>
      <section className="px-4 w-full max-h-full overflow-y-scroll">
        {children}
      </section>
    </section>
  )
}