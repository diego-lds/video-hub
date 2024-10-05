import Image from "next/image";
import AuthButton from "./AuthButton";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className="w-full flex justify-center items-center   border-b border-b-foreground/10 h-16 ">
      <div className="w-full container flex justify-between items-center   text-sm">
        <div className="flex justify-center items-center ">
          <Image
            className="mb-3"
            width={40}
            height={40}
            src="/cam.svg"
            alt="Logo"
          />
          <div className="flex justify-center items-center ">
            <Link href="/" className="ml-10 mr-5">
              Home
            </Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
