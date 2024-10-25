import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { createClient } from "@/utils/supabase/server";

export async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header>
      <nav className="h-20 border-b  flex items-center justify-between px-4 sm:px-16">
        <div className="flex gap-24">
          <Image
            src="/logo.svg"
            priority={true}
            alt="logo"
            width={96}
            height={40}
          />
          {user && (
            <div className="hidden gap-10 sm:flex sm:items-center">
              <NavMenu />
            </div>
          )}
        </div>

        <AuthButton />
      </nav>

      {user && (
        <div className="max-h-screen px-6 py-4 overflow-hidden sm:hidden sm:text-sm">
          <NavMenu />
        </div>
      )}
    </header>
  );
}

function NavMenu() {
  const menuItems = [
    { href: "/", label: "Início" },
    { href: "/my-courses", label: "Meus Cursos" },
    { href: "/profile", label: "Perfil" },
    { href: "/video-compressor", label: "Ferramentas" },
  ];

  return (
    <ul className="flex flex-col sm:flex-row sm:gap-4">
      {menuItems.map((item) => (
        <li
          key={item.href}
          className="flex border-b item-center  py-2 text-sm sm:text-lg sm:border-b-0"
        >
          <Link href={item.href}>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
