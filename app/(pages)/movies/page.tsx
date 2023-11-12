import React from "react"

import getAllMovies from "@/app/actions/getAllMovies"
import getCurrentUser from "@/app/actions/getCurrentUser"
import Navbar from "@/app/components/Navbar"
import MoviesList from "@/app/components/MoviesList"

const Movies = async () => {
  const currentUser = await getCurrentUser()
  const movies = await getAllMovies()

  return (
    <>
      <Navbar username={currentUser?.name} />
      <div className="pb-40 pt-72">
        <MoviesList title="Фільми" movies={movies} />
      </div>
    </>
  )
}

export default Movies
