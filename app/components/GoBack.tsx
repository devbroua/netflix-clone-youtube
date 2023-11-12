"use client"
import { useRouter } from "next/navigation"
import React from "react"

import { BsFillArrowLeftSquareFill as LeftArrowIcon } from "react-icons/bs"

const GoBack: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <LeftArrowIcon
        onClick={() => router.back()}
        className="
            w-4
            md:w-10
            text-white
            text-4xl
            cursor-pointer
            hover:opacity-80
            transition
        "
      />
    </>
  )
}

export default GoBack
