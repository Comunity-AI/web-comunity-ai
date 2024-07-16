import Carrousel from '@/components/carrousel'
import Navbar from "@/components/nav/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full h-screen px-7 pt-4 dark:text-white">
        <Carrousel />
        <section>
        </section>
      </main>
    </>
  );
}
