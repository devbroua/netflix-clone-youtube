import prisma from "@/app/utils/prismadb"
import getCurrentUser from "./getCurrentUser"

export default async function getFavoritesMovies() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new Error("You must be logged in to see your favorites movies")
    }

    const favoritesMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    })

    return favoritesMovies
  } catch (error: any) {
    throw new Error(error)
  }
}
