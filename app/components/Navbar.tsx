"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { signOut } from "next-auth/react"

import NavbarItem from "@/app/components/NavbarItem"

type NavbarProps = {
  username?: string
}

enum NavbarLinks {
  "/home" = "Головна",
  "/movies" = "Фільми",
  "/favorites" = "Улюблені",
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavClick = (newPath: string) => {
    router.push(newPath)
  }

  return (
    <nav className="w-full fixed z-40">
      {username ? (
        <div
          className="
          px-4 
          md:px-16 
          py-6 
          flex 
          flex-row 
          items-center 
          justify-between 
          transition 
          duration-500"
        >
          <Image
            onClick={() => router.push("/home")}
            width={100}
            height={100}
            src="/images/logo.svg"
            className="h-24 w-36 cursor-pointer"
            alt="logo"
          />
          <div className="flex-row ml-8 gap-6 hidden lg:flex">
            {Object.entries(NavbarLinks).map(([path, label]) => (
              <NavbarItem
                key={path}
                label={label}
                path={path}
                active={pathname === path}
                handleClick={handleNavClick}
              />
            ))}
          </div>

          <div className="flex flex-row ml-auto gap-7 items-center">
            <div className="flex flex-row items-center">
              <Image
                width={100}
                height={100}
                className="h-12 w-12 rounded-full mr-4"
                src="/images/devbro.png"
                alt="avatar"
              />

              <button
                className="
                  flex 
                  flex-row 
                  items-center 
                  bg-red-600 
                  py-1 
                  px-4 
                  text-white 
                  font-semibold 
                  rounded-[4px] 
                  hover:bg-red-700 
                  transition"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 md:px-16 py-6 flex flex-row items-center justify-between transition duration-500">
          <Image
            width={100}
            height={100}
            src="/images/logo.svg"
            className="h-24 w-36"
            alt="logo"
          />
          <button
            className="
            flex 
            flex-row 
            items-center 
            bg-red-600 
            py-1 
            px-4 
            text-white 
            font-semibold 
            rounded-[4px]
            hover:bg-red-700
            transition
            "
            onClick={() => router.push("/auth")}
          >
            Увійти
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
