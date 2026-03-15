import { supabase } from "./supabase";

export interface Anime {
  id: string;
  title: string;
  titleJapanese?: string;
  synopsis: string;
  coverImage: string;
  bannerImage?: string;
  rating: number;
  episodes: number;
  status: "Airing" | "Completed" | "Upcoming";
  type: "TV" | "Movie" | "OVA" | "ONA" | "Special";
  genres: string[];
  studio: string;
  year: number;
  season: "Winter" | "Spring" | "Summer" | "Fall";
  duration: string;
  views: number;
}

export interface Episode {
  id: string;
  animeId: string;
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
  aired: string;
}

export const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Mecha", "Mystery", "Psychological", "Romance",
  "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller",
];

// Map Supabase snake_case to camelCase
function mapAnime(row: any): Anime {
  return {
    id: row.id,
    title: row.title,
    titleJapanese: row.title_japanese,
    synopsis: row.synopsis,
    coverImage: row.cover_image,
    bannerImage: row.banner_image,
    rating: Number(row.rating),
    episodes: row.episodes,
    status: row.status,
    type: row.type,
    genres: row.genres || [],
    studio: row.studio,
    year: row.year,
    season: row.season,
    duration: row.duration,
    views: row.views || 0,
  };
}

// Fetch all anime from Supabase
export async function fetchAnimeList(): Promise<Anime[]> {
  const { data, error } = await supabase
    .from("anime")
    .select("*")
    .order("views", { ascending: false });
  if (error) { console.error("Error fetching anime:", error); return []; }
  return data.map(mapAnime);
}

// Fetch single anime by ID
export async function fetchAnimeById(id: string): Promise<Anime | null> {
  const { data, error } = await supabase
    .from("anime").select("*").eq("id", id).single();
  if (error) return null;
  return mapAnime(data);
}

// Fetch anime by genre
export async function fetchAnimeByGenre(genre: string): Promise<Anime[]> {
  const { data, error } = await supabase
    .from("anime").select("*").contains("genres", [genre]);
  if (error) return [];
  return data.map(mapAnime);
}

// Search anime
export async function searchAnimeDB(query: string): Promise<Anime[]> {
  const { data, error } = await supabase
    .from("anime").select("*")
    .or(`title.ilike.%${query}%,studio.ilike.%${query}%,synopsis.ilike.%${query}%`);
  if (error) return [];
  return data.map(mapAnime);
}

// Fetch trending
export async function fetchTrending(): Promise<Anime[]> {
  const { data, error } = await supabase
    .from("anime").select("*").order("views", { ascending: false }).limit(6);
  if (error) return [];
  return data.map(mapAnime);
}

// Fetch recently added
export async function fetchRecentlyAdded(): Promise<Anime[]> {
  const { data, error } = await supabase
    .from("anime").select("*").order("year", { ascending: false }).limit(6);
  if (error) return [];
  return data.map(mapAnime);
}

// Add new anime (admin only)
export async function addAnime(anime: Omit<Anime, "views">): Promise<{ error: string | null }> {
  const { error } = await supabase.from("anime").insert({
    id: anime.id,
    title: anime.title,
    title_japanese: anime.titleJapanese,
    synopsis: anime.synopsis,
    cover_image: anime.coverImage,
    banner_image: anime.bannerImage,
    rating: anime.rating,
    episodes: anime.episodes,
    status: anime.status,
    type: anime.type,
    genres: anime.genres,
    studio: anime.studio,
    year: anime.year,
    season: anime.season,
    duration: anime.duration,
    views: 0,
  });
  return { error: error?.message || null };
}

// Delete anime (admin only)
export async function deleteAnime(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from("anime").delete().eq("id", id);
  return { error: error?.message || null };
}

// Update anime (admin only)
export async function updateAnime(id: string, updates: Partial<Anime>): Promise<{ error: string | null }> {
  const { error } = await supabase.from("anime").update({
    title: updates.title,
    title_japanese: updates.titleJapanese,
    synopsis: updates.synopsis,
    cover_image: updates.coverImage,
    banner_image: updates.bannerImage,
    rating: updates.rating,
    episodes: updates.episodes,
    status: updates.status,
    type: updates.type,
    genres: updates.genres,
    studio: updates.studio,
    year: updates.year,
    season: updates.season,
    duration: updates.duration,
  }).eq("id", id);
  return { error: error?.message || null };
}

// Generate episodes for watch page
export function generateEpisodes(anime: Anime): Episode[] {
  return Array.from({ length: Math.min(anime.episodes, 24) }, (_, i) => ({
    id: `${anime.id}-ep-${i + 1}`,
    animeId: anime.id,
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: anime.coverImage,
    duration: anime.duration,
    aired: `${anime.year}-${String(Math.min(i + 1, 12)).padStart(2, "0")}-15`,
  }));
}

// Legacy — kept for backward compatibility
export let animeList: Anime[] = [];
export function getAnimeById(id: string): Anime | undefined {
  return animeList.find((a) => a.id === id);
}
export function getAnimeByGenre(genre: string): Anime[] {
  return animeList.filter((a) => a.genres.includes(genre));
}
export function searchAnime(query: string): Anime[] {
  const q = query.toLowerCase();
  return animeList.filter(
    (a) => a.title.toLowerCase().includes(q) ||
      a.genres.some((g) => g.toLowerCase().includes(q)) ||
      a.studio.toLowerCase().includes(q)
  );
}