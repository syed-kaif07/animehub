import Link from "next/link";
import {
  User,
  Settings,
  Clock,
  Heart,
  BarChart3,
  Calendar,
  Play,
} from "lucide-react";
import { animeList } from "@/lib/anime-data";
import { AnimeCard } from "@/components/anime-card";

export default function ProfilePage() {
  const watchlist = animeList.slice(0, 4);
  const history = animeList.slice(4, 8);

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border border-border-main bg-bg-card p-8 md:flex-row md:items-start">
          {/* Avatar */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-main/10">
            <User className="h-10 w-10 text-green-main" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-heading text-2xl font-bold text-text-main">
              Guest User
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              Sign in to personalize your experience
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 md:justify-start">
              {[
                { icon: Play, label: "Episodes Watched", value: "0" },
                { icon: Clock, label: "Watch Time", value: "0h" },
                { icon: Heart, label: "Favorites", value: "0" },
                {
                  icon: Calendar,
                  label: "Joined",
                  value: new Date().toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  }),
                },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-lg font-bold text-text-main">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/settings"
              className="flex h-9 items-center gap-2 rounded-lg border border-border-main bg-bg-panel px-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-main"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              icon: Heart,
              label: "My Favorites",
              desc: "Anime you love",
              href: "#",
            },
            {
              icon: Clock,
              label: "Watch History",
              desc: "Continue watching",
              href: "#",
            },
            {
              icon: BarChart3,
              label: "Statistics",
              desc: "Your activity",
              href: "#",
            },
            {
              icon: Settings,
              label: "Settings",
              desc: "Preferences",
              href: "/settings",
            },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl border border-border-main bg-bg-card p-4 transition-colors hover:border-green-main/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-main/10">
                <action.icon className="h-5 w-5 text-green-main" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-main group-hover:text-green-main">
                  {action.label}
                </div>
                <div className="text-xs text-text-muted">{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Watchlist */}
        <section className="mb-8">
          <h2 className="mb-4 font-heading text-xl font-bold text-text-main">
            Watchlist
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {watchlist.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>

        {/* Watch History */}
        <section>
          <h2 className="mb-4 font-heading text-xl font-bold text-text-main">
            Watch History
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {history.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
