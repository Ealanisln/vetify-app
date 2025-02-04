"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { useUser } from "@/src/lib/auth";
import { signOut } from "@/src/app/(login)/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push("/");
  }

  return (
    <header className="border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Vetify Logo"
            width={200}
            height={60}
            className="h-16 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            href="/elige-tu-plan" 
            className="text-lg font-medium text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] relative group px-4 py-2"
          >
            Elige tu plan
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[hsl(var(--accent))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer size-10 ring-2 ring-[hsl(var(--primary))/20] hover:ring-[hsl(var(--primary))/40] transition-all duration-300">
                  <AvatarImage alt={user.name || ""} />
                  <AvatarFallback className="bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">
                    {user.email
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={handleSignOut} className="w-full">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:opacity-90 text-[hsl(var(--accent-foreground))] text-lg font-medium px-8 py-6 rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Link href="/sign-up">Registrarse</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}