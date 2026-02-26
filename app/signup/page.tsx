"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-main px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-main">
              <Play className="h-5 w-5 fill-bg-main text-bg-main" />
            </div>
            <span className="font-heading text-2xl font-bold text-text-main">
              AnimeHub
            </span>
          </Link>
          <p className="mt-2 text-sm text-text-muted">
            Create your account and start watching.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border-main bg-bg-card p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-4"
          >
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-text-main"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="h-11 w-full rounded-xl border border-border-input bg-bg-panel pl-10 pr-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-text-main"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-border-input bg-bg-panel pl-10 pr-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-text-main"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="h-11 w-full rounded-xl border border-border-input bg-bg-panel pl-10 pr-10 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-border-input bg-bg-panel accent-green-main"
                required
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-green-main hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-green-main hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="glow-green mt-2 h-11 rounded-full bg-green-main text-sm font-semibold text-bg-main transition-all hover:-translate-y-0.5 hover:bg-green-hover"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-main hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
