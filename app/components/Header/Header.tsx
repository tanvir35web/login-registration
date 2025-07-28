"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CgMenuRight } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

const NavItem = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => {
  return (
    <li
      onClick={onClick}
      className="text-base text-black font-semibold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer"
    >
      {label}
    </li>
  );
};

export const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Replace these with your real data
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="w-full h-20 bg-white border-b border-gray-300 font-bodyFont z-20 p-2 fixed top-0">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between overflow-hidden">
        <Link href="/" onClick={scrollToTop} className="font-black text-xl">
          {/* <Image className="w-32" src={darkLogo} alt="dark logo" /> */}
          E-Shopping
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleNav}
            className="text-black p-2 focus:outline-none"
          >
            <CgMenuRight className="text-2xl" />
          </button>
        </div>

        <div
          className={`${
            showNav ? "sideNavActive" : ""
          } items-center gap-8 md:flex sideNav overflow-hidden`}
        >
          <ul
            className={`flex items-center gap-8 ${
              showNav ? "flex-col md:flex-row" : "flex-row"
            }`}
          >
            {showNav && (
              <IoMdClose
                onClick={toggleNav}
                className="mt-8 text-3xl md:hidden"
              />
            )}

            <Link href="/">
              <NavItem onClick={toggleNav} label="Home" />
            </Link>
            <Link href="/">
              <NavItem onClick={toggleNav} label="Shop" />
            </Link>
            <Link href="/cart">
              <NavItem onClick={toggleNav} label="Cart" />
            </Link>
            <Link href="/login">
              <NavItem onClick={toggleNav} label="User" />
            </Link>
            <Link href="/">
              <NavItem onClick={toggleNav} label="About" />
            </Link>
          </ul>

          <Link href="/cart">
            <div
              onClick={toggleNav}
              className="w-20 bg-amber-200 px-3 py-2 rounded-md flex items-center gap-3"
            >
              <FaCartShopping />
              <p className="text-lg font-bold">{cartCount}</p>
            </div>
          </Link>

          <Link href={user ? "/profile" : "/login"}>
            <div onClick={toggleNav} className="flex gap-3 items-center">
              {user ? (
                <div className="flex items-center gap-2">
                  <FaUserCircle size={24} />
                  <span className="text-sm font-medium">{user.name}</span>
                  
                </div>
              ) : (
                <FaUserCircle size={24} />
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
