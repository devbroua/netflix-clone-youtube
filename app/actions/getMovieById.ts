import prisma from "@/app/utils/prismadb"

type Params = {
  movieId: string
}

export default async function getMovieById({ movieId }: Params) {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!movie) {
      throw new Error("Movie not found")
    }

    return movie
  } catch (error: any) {
    throw new Error(error)
  }
}
