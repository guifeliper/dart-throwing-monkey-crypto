"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import DumbLayout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [result, setResult] = useState();

  const handleFetch = () => {
    fetch("/api/generateTokens", {
      cache: "no-store",
    })
      .then((res) => {
        return res.json();
      })
      .then((req) => {
        console.log(req);
        setResult(req);
      });
  };
  return <DumbLayout />;
}
