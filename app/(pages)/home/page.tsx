import getCurrentUser from "@/app/actions/getCurrentUser"
import Billboard from "@/app/components/Billboard"
import Navbar from "@/app/components/Navbar"
import React from "react"

const Home: React.FC = async () => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <Navbar username={currentUser?.name} />
      <Billboard />
    </>
  )
}

export default Home
