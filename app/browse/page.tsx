"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import { AnimeCard } from "@/components/anime-card";
import { animeList, genres } from "@/lib/anime-data";
import type { Anime } from "@/lib/anime-data";

type SortOption = "popular" | "rating" | "newest" | "title";
type StatusFilter = "all" | "Airing" | "Completed" | "Upcoming";
type TypeFilter = "all" | "TV" | "Movie" | "OVA" | "ONA" | "Special";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialGenre = searchParams.get("genre") || "";
  const initialSort = (searchParams.get("sort") as SortOption) || "popular";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAnime = useMemo(() => {
    let results: Anime[] = [...animeList];

    // Search
    if (searchQuery) {
      const lq = searchQuery.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(lq) ||
          a.genres.some((g) => g.toLowerCase().includes(lq)) ||
          a.studio.toLowerCase().includes(lq)
      );
    }

    // Genre filter
    if (selectedGenre) {
      results = results.filter((a) => a.genres.includes(selectedGenre));
    }

    // Status filter
    if (statusFilter !== "all") {
      results = results.filter((a) => a.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      results = results.filter((a) => a.type === typeFilter);
    }

    // Sort
    switch (sortBy) {
      case "popular":
        results.sort((a, b) => b.views - a.views);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        results.sort((a, b) => b.year - a.year);
        break;
      case "title":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return results;
  }, [searchQuery, selectedGenre, sortBy, statusFilter, typeFilter]);

  const hasActiveFilters =
    selectedGenre || statusFilter !== "all" || typeFilter !== "all";

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-text-main md:text-4xl">
            Browse Anime
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Discover your next favorite series from our collection
          </p>
        </div>

        {/* Search & Controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search by title, genre, or studio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-border-input bg-bg-panel pl-10 pr-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-11 rounded-xl border border-border-input bg-bg-panel px-4 text-sm text-text-secondary focus:border-green-main focus:outline-none"
              aria-label="Sort by"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="title">A - Z</option>
            </select>

            {/* Toggle Filters */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? "border-green-main bg-green-main/10 text-green-main"
                  : "border-border-input bg-bg-panel text-text-secondary hover:text-text-main"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-border-main bg-bg-panel p-5">
            <div className="flex flex-col gap-5">
              {/* Genres */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-text-main">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGenre("")}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      !selectedGenre
                        ? "bg-green-main text-bg-main"
                        : "bg-bg-card text-text-secondary hover:text-text-main"
                    }`}
                  >
                    All
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() =>
                        setSelectedGenre(selectedGenre === genre ? "" : genre)
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedGenre === genre
                          ? "bg-green-main text-bg-main"
                          : "bg-bg-card text-text-secondary hover:text-text-main"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status & Type */}
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-text-main">
                    Status
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "Airing", "Completed", "Upcoming"] as const).map(
                      (status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatusFilter(status)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                            statusFilter === status
                              ? "bg-green-main text-bg-main"
                              : "bg-bg-card text-text-secondary hover:text-text-main"
                          }`}
                        >
                          {status === "all" ? "All" : status}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-text-main">
                    Type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(
                      ["all", "TV", "Movie", "OVA", "ONA", "Special"] as const
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTypeFilter(type)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          typeFilter === type
                            ? "bg-green-main text-bg-main"
                            : "bg-bg-card text-text-secondary hover:text-text-main"
                        }`}
                      >
                        {type === "all" ? "All" : type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear All */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                  }}
                  className="self-start text-sm text-green-main hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-text-muted">
          {filteredAnime.length} anime found
          {searchQuery && (
            <span>
              {" "}
              for &ldquo;{searchQuery}&rdquo;
            </span>
          )}
          {selectedGenre && <span> in {selectedGenre}</span>}
        </div>

        {/* Anime Grid */}
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredAnime.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Grid3X3 className="mb-4 h-12 w-12 text-text-disabled" />
            <h3 className="mb-1 text-lg font-semibold text-text-main">
              No results found
            </h3>
            <p className="text-sm text-text-muted">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
