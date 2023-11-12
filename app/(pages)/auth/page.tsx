"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import BgProvider from "@/app/components/BgProvider"
import Image from "next/image"

import { FaGoogle, FaGithub } from "react-icons/fa"
import Input from "@/app/components/Input"
import axios from "axios"

type VariantType = "login" | "register"

const AuthPage: React.FC = () => {
  const router = useRouter()
  const [variant, setVariant] = useState<VariantType>("login")

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleVariantChange = () => {
    setVariant((prevVariant) =>
      prevVariant === "login" ? "register" : "login"
    )
  }

  const login = async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/home",
      })
    } catch (error) {
      console.log("login error", error)
    }
  }

  const register = async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      })

      login()
    } catch (error) {
      console.log("login error", error)
    }
  }

  return (
    <BgProvider removeBgOnMobile>
      <nav className="px-4 md:px-16 py-6">
        <Image
          onClick={() => router.push("/")}
          width={100}
          height={100}
          src="/images/logo.svg"
          className="h-24 w-36 cursor-pointer"
          alt="logo"
        />
      </nav>

      <div className="flex justify-center">
        <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2>{variant === "login" ? "Увійти" : "Зареєструватись"}</h2>
          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <Input
                id="name"
                label="Ім'я"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            )}
            <Input
              id="email"
              type="email"
              label="Електронна пошта"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <Input
              id="password"
              type="password"
              label="Пароль"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            onClick={variant === "login" ? login : register}
            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
          >
            {variant === "login" ? "Увійти" : "Зареєструватись"}
          </button>

          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
            <div
              className="
                w-10 
                h-10 
                bg-white 
                rounded-full 
                flex 
                items-center 
                justify-center 
                cursor-pointer 
                hover:opacity-80 
                transition"
              onClick={() => signIn("google", { callbackUrl: "/home" })}
            >
              <FaGoogle size={32} />
            </div>
            <div
              className="
                w-10 
                h-10 
                bg-white 
                rounded-full 
                flex 
                items-center 
                justify-center 
                cursor-pointer 
                hover:opacity-80 
                transition"
              onClick={() => signIn("github", { callbackUrl: "/home" })}
            >
              <FaGithub size={32} />
            </div>
          </div>

          <p className="text-neutral-500 mt-12">
            {variant === "login" ? "Уперше на Netflix?" : "Уже маєш акаунт?"}
            <span
              onClick={handleVariantChange}
              className="text-white ml-1 cursor-pointer hover:underline transition"
            >
              {variant === "login" ? "Зареєструватись" : "Увійти"}
            </span>
          </p>
        </div>
      </div>
    </BgProvider>
  )
}

export default AuthPage
