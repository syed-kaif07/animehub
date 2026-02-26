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
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mecha",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export const animeList: Anime[] = [
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    titleJapanese: "Shingeki no Kyojin",
    synopsis:
      "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid beings who devour humans seemingly without reason. The story follows Eren Yeager, who vows to exterminate the Titans after they destroy his hometown and kill his mother.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
    bannerImage:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1400&h=500&fit=crop",
    rating: 9.0,
    episodes: 87,
    status: "Completed",
    type: "TV",
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    studio: "MAPPA",
    year: 2013,
    season: "Spring",
    duration: "24 min",
    views: 2500000,
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    titleJapanese: "Jujutsu Kaisen",
    synopsis:
      "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary life. One day, to save a friend who has been attacked by Curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
    rating: 8.7,
    episodes: 47,
    status: "Completed",
    type: "TV",
    genres: ["Action", "Supernatural", "Drama"],
    studio: "MAPPA",
    year: 2020,
    season: "Fall",
    duration: "24 min",
    views: 1800000,
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    titleJapanese: "Kimetsu no Yaiba",
    synopsis:
      "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
    rating: 8.5,
    episodes: 55,
    status: "Airing",
    type: "TV",
    genres: ["Action", "Fantasy", "Supernatural"],
    studio: "ufotable",
    year: 2019,
    season: "Spring",
    duration: "24 min",
    views: 2200000,
  },
  {
    id: "one-piece",
    title: "One Piece",
    titleJapanese: "One Piece",
    synopsis:
      "Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever, known as 'One Piece', and becoming the next King of the Pirates.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
    rating: 8.7,
    episodes: 1100,
    status: "Airing",
    type: "TV",
    genres: ["Action", "Adventure", "Comedy", "Fantasy"],
    studio: "Toei Animation",
    year: 1999,
    season: "Fall",
    duration: "24 min",
    views: 3000000,
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    titleJapanese: "Spy x Family",
    synopsis:
      "A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep together.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/1441/139629l.jpg",
    rating: 8.6,
    episodes: 37,
    status: "Airing",
    type: "TV",
    genres: ["Action", "Comedy", "Slice of Life"],
    studio: "WIT Studio",
    year: 2022,
    season: "Spring",
    duration: "24 min",
    views: 1500000,
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    titleJapanese: "Chainsaw Man",
    synopsis:
      "Denji has a simple dream - to live a happy and peaceful life, spending time with a girl he likes. This is a far cry from reality, however, as Denji is forced by the yakuza into killing devils to pay off his crushing debts.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
    rating: 8.5,
    episodes: 12,
    status: "Completed",
    type: "TV",
    genres: ["Action", "Supernatural", "Horror"],
    studio: "MAPPA",
    year: 2022,
    season: "Fall",
    duration: "24 min",
    views: 1400000,
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    titleJapanese: "Ore dake Level Up na Ken",
    synopsis:
      "In a world where hunters must battle deadly monsters to protect humanity, Sung Jinwoo, the weakest hunter, finds a hidden dungeon with a mysterious program that only he can see, and begins his journey to become the strongest.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/1929/131135l.jpg",
    rating: 8.3,
    episodes: 24,
    status: "Airing",
    type: "TV",
    genres: ["Action", "Adventure", "Fantasy"],
    studio: "A-1 Pictures",
    year: 2024,
    season: "Winter",
    duration: "24 min",
    views: 1600000,
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    titleJapanese: "Boku no Hero Academia",
    synopsis:
      "In a world where people with superpowers known as Quirks are the norm, Izuku Midoriya has dreams of one day becoming a Hero despite being bullied by his classmates for not having a Quirk.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/10/78745l.jpg",
    rating: 8.0,
    episodes: 138,
    status: "Completed",
    type: "TV",
    genres: ["Action", "Comedy", "Supernatural"],
    studio: "Bones",
    year: 2016,
    season: "Spring",
    duration: "24 min",
    views: 1900000,
  },
  {
    id: "death-note",
    title: "Death Note",
    titleJapanese: "Death Note",
    synopsis:
      "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
    rating: 9.0,
    episodes: 37,
    status: "Completed",
    type: "TV",
    genres: ["Mystery", "Psychological", "Thriller", "Supernatural"],
    studio: "Madhouse",
    year: 2006,
    season: "Fall",
    duration: "23 min",
    views: 2800000,
  },
  {
    id: "fullmetal-alchemist",
    title: "Fullmetal Alchemist: Brotherhood",
    titleJapanese: "Hagane no Renkinjutsushi",
    synopsis:
      "Two brothers search for a Philosopher's Stone after an pointless attempt to bring their mother back to life costs them dearly. Edward loses his brother's body and his own leg and arm.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/1208/94745l.jpg",
    rating: 9.1,
    episodes: 64,
    status: "Completed",
    type: "TV",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    studio: "Bones",
    year: 2009,
    season: "Spring",
    duration: "24 min",
    views: 2600000,
  },
  {
    id: "naruto-shippuden",
    title: "Naruto Shippuden",
    titleJapanese: "Naruto: Shippuuden",
    synopsis:
      "Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, acknowledged as the leader and strongest of all ninja.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/5/17407l.jpg",
    rating: 8.3,
    episodes: 500,
    status: "Completed",
    type: "TV",
    genres: ["Action", "Adventure", "Comedy", "Supernatural"],
    studio: "Pierrot",
    year: 2007,
    season: "Winter",
    duration: "23 min",
    views: 2400000,
  },
  {
    id: "steins-gate",
    title: "Steins;Gate",
    titleJapanese: "Steins;Gate",
    synopsis:
      "The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he indulges himself in his hobby of inventing prospective future gadgets.",
    coverImage:
      "https://cdn.myanimelist.net/images/anime/5/73199l.jpg",
    rating: 9.1,
    episodes: 24,
    status: "Completed",
    type: "TV",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    studio: "White Fox",
    year: 2011,
    season: "Spring",
    duration: "24 min",
    views: 1700000,
  },
];

export const trendingAnime = animeList.slice(0, 6);
export const popularAnime = animeList
  .sort((a, b) => b.views - a.views)
  .slice(0, 6);
export const recentlyAdded = animeList
  .sort((a, b) => b.year - a.year)
  .slice(0, 6);

export function getAnimeById(id: string): Anime | undefined {
  return animeList.find((anime) => anime.id === id);
}

export function getAnimeByGenre(genre: string): Anime[] {
  return animeList.filter((anime) => anime.genres.includes(genre));
}

export function searchAnime(query: string): Anime[] {
  const lowerQuery = query.toLowerCase();
  return animeList.filter(
    (anime) =>
      anime.title.toLowerCase().includes(lowerQuery) ||
      anime.genres.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      anime.studio.toLowerCase().includes(lowerQuery)
  );
}

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
