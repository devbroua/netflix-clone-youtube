const isFavoriteMovie = (movieId: string, favoritesIds?: string[]): boolean => {
  return favoritesIds === undefined ? false : favoritesIds.includes(movieId)
}

export default isFavoriteMovie
