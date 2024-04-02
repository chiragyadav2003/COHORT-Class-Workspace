import Image from "next/image";
import { Appbar } from "@/components/Appbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h2>NextAuth app home page</h2>
      <Appbar/>
    </div>
  );
}
