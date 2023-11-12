import prisma from "@/app/utils/prismadb"

export default async function getAllMovies() {
  try {
    const movies = await prisma.movie.findMany()

    return movies
  } catch (error: any) {
    throw new Error(error)
  }
}
