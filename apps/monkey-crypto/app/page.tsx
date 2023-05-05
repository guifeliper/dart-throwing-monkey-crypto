"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [result, setResult] = useState();

  const handleFetch = () => {
    fetch("/api/generateTokens", { cache: 'no-store' })
      .then((res) => {
        return res.json();
      })
      .then((req) => {
        console.log(req);
        setResult(req);
      });
  };
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="text-white">Here it is: {JSON.stringify(result)}</div>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={handleFetch}
      >
        Call endpoint and display value
      </button>
    </main>
  );
}
