"use client";

import React from "react";
import { assets, BoxIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, Package } from "lucide-react"; // Package = My Orders icon

const Navbar = () => {
  const { isSeller } = useAppContext();
  const { user, isLoaded } = useUser(); // ✅ Clerk user

  const router = useRouter();

  // ✅ Prevent rendering until user state is loaded to avoid hydration errors
  if (!isLoaded) return null;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">

      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
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
      <ul className="hidden md:flex items-center gap-4">
        <Image src={assets.search_icon} alt="search" className="w-4 h-4" />

        {user ? (
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>

              <UserButton.Action
                label="Cart"
                labelIcon={<ShoppingCart size={16} />}
                onClick={() => router.push("/cart")}
              />

              <UserButton.Action
                label="My Orders"
                labelIcon={<Package size={16} />}
                onClick={() => router.push("/my-orders")}
              />

              {isSeller && (
                <UserButton.Action
                  label="Seller Dashboard"
                  onClick={() => router.push("/seller")}
                />
              )}

            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <SignInButton asChild>
            <button className="flex items-center gap-2">
              <Image src={assets.user_icon} alt="user" />
              Sign In
            </button>
          </SignInButton>
        )}
      </ul>

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
          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>

              <UserButton.Action
                label="Home"
                labelIcon={<HomeIcon size={16} />}
                onClick={() => router.push("/")}
              />
              <UserButton.Action
                label="Products"
                labelIcon={<BoxIcon size={16} />}
                onClick={() => router.push("/all-products")}
              />
              <UserButton.Action
                label="Cart"
                labelIcon={<ShoppingCart size={16} />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<Package size={16} />}
                onClick={() => router.push("/my-orders")}
              />

              {isSeller && (
                <UserButton.Action
                  label="Seller Dashboard"
                  onClick={() => router.push("/seller")}
                />
              )}

            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <SignInButton asChild>
            <button className="flex items-center gap-2">
              <Image src={assets.user_icon} alt="user" />
              Sign In
            </button>
          </SignInButton>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
