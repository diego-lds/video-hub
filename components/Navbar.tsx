import AuthButton from "./AuthButton";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className="w-full flex justify-center items-center  border-b border-b-foreground/10 h-16 ">
      <p className="text-foreground/60 mr-8 rounded bg-green-200 p-2">Logo</p>
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex justify-center">
          <Link href="/" className="mr-4">
            Home
          </Link>
          <Link href="/admin">Admin</Link>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}