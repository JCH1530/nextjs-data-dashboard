import Head from "next/head";
import Dashboard from "@/pages/dashboard";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Login from "@/components/Login";
import { useSession } from "next-auth/react";
import scss from "./Home.module.scss";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>DataSoft - Data Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={scss.main}>
        <Header />
        {session && (
          <>
            <SideMenu />
            <Dashboard />
          </>
        )}
        <Login />
      </main>
    </>
  );
}
