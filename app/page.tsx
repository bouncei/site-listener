import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/elements";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="bg-slate-700 min-h-screen">{/* Hero section */}</main>
  );
}
