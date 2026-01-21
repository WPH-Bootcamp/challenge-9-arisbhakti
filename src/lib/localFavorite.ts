export type FavoriteMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
};

const KEY = "favorite-movies";

export function getFavorites(): FavoriteMovie[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isMovieFavorite(id: number): boolean {
  return getFavorites().some((m) => m.id === id);
}

export function addFavorite(movie: FavoriteMovie) {
  const favorites = getFavorites();
  if (!favorites.find((m) => m.id === movie.id)) {
    localStorage.setItem(KEY, JSON.stringify([...favorites, movie]));
  }
}

export function removeFavorite(id: number) {
  const next = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function toggleFavorite(movie: FavoriteMovie): boolean {
  if (isMovieFavorite(movie.id)) {
    removeFavorite(movie.id);
    return false;
  }
  addFavorite(movie);
  return true;
}
