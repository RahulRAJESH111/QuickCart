"use client";

import React, { useEffect, useState } from "react";
import { assets, BoxIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, Package } from "lucide-react";

const Navbar = () => {
  const { isSeller } = useAppContext();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Hydration fix for Clerk
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!isLoaded || !mounted) return null;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">

      {/* Logo */}
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image
          src={assets.logo}
          alt="logo"
          width={128}
          height={32}
          className="w-28 md:w-32"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden max-md:flex lg:flex items-center gap-4 lg:gap-8">
        <Link href="/">Home</Link>
        <Link href="/all-products">Shop</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Contact</Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <Image
          src={assets.search_icon}
          alt="search"
          width={16}
          height={16}
          className="w-4 h-4"
        />

        {user ? (
          <div className="relative">
            <UserButton afterSignOutUrl="/" />
            {/* Custom Dropdown if needed */}
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center gap-2">
              <Image
                src={assets.user_icon}
                alt="user"
                width={24}
                height={24}
              />
              Sign In
            </button>
          </SignInButton>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="flex items-center md:hidden gap-3">

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-3 py-1.5 rounded-full"
          >
            Seller
          </button>
        )}

        {user ? (
          <div className="relative">
            <UserButton afterSignOutUrl="/" />
            {/* For mobile, consider a dropdown menu here */}
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center gap-2">
              <Image
                src={assets.user_icon}
                alt="user"
                width={24}
                height={24}
              />
              Sign In
            </button>
          </SignInButton>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
