import { NextRequest, NextResponse } from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/utils/prismadb"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { movieId } = body

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new Error("You must be logged in to add a movie to your favorites")
    }

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!existingMovie) {
      throw new Error("Movie not found")
    }

    const user = await prisma.user.update({
      where: {
        email: currentUser.email || "",
      },

      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { movieId } = body

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      throw new Error("You must be logged in to add a movie to your favorites")
    }

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!existingMovie) {
      throw new Error("Movie not found")
    }

    const updatedFavoritesIds = currentUser.favoriteIds.filter(
      (id) => id !== movieId
    )

    const user = await prisma.user.update({
      where: {
        email: currentUser.email || "",
      },

      data: {
        favoriteIds: updatedFavoritesIds,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.error()
  }
}
