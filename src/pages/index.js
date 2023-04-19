import { useState, useEffect } from "react";

import Head from "next/head";

import styles from "@/styles/Home.module.css";
import Chat from "../../components/Chat";
import SelectUserName from "../../components/Chat/SelectUsername";

export default function Home() {
  const [username, setUsername] = useState("");
  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <main>
        <Chat />
        {/* {username ? <Chat /> : <SelectUserName />} */}
      </main>
    </>
  );
}
