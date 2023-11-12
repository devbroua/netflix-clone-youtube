import React from "react"

import getCurrentUser from "@/app/actions/getCurrentUser"
import getFavoritesMovies from "@/app/actions/getFavoritesMovies"
import Navbar from "@/app/components/Navbar"
import MoviesList from "@/app/components/MoviesList"

const FavoritesMovies = async () => {
  const currentUser = await getCurrentUser()
  const favoritesMovies = await getFavoritesMovies()

  return (
    <>
      <Navbar username={currentUser?.name} />
      <div className="pb-40 pt-72">
        <MoviesList title="Улюблені" movies={favoritesMovies} />
      </div>
    </>
  )
}

export default FavoritesMovies
