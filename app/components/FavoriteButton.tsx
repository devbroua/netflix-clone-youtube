import axios from "axios"
import React, { useState } from "react"

import {
  AiOutlineCheck as CheckIcon,
  AiOutlinePlus as PlusIcon,
} from "react-icons/ai"

type FavoriteButtonProps = {
  movieId: string
  isFavorite: boolean
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
  isFavorite,
}) => {
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(isFavorite)

  const toggleFavorite = async () => {
    let response

    if (isFavoriteMovie) {
      response = await axios.delete("/api/favorites", {
        data: { movieId },
      })
    } else {
      response = await axios.post("/api/favorites", { movieId })
    }

    if (response.status === 200) {
      setIsFavoriteMovie((prevFavoriteValue) => !prevFavoriteValue)
    }
  }

  let Icon = isFavoriteMovie ? CheckIcon : PlusIcon

  return (
    <div
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        bg-white
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:bg-green-500    
  
  "
      onClick={toggleFavorite}
    >
      <Icon className="text-black text-2xl" />
    </div>
  )
}

export default FavoriteButton
