"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 font-heading text-3xl font-bold text-text-main md:text-4xl">
              Contact Us
            </h1>
            <p className="text-sm text-text-muted">
              Have a question, suggestion, or want to report an issue? Reach out
              to us.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border-main bg-bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-main" />
                <span className="text-sm font-semibold text-text-main">
                  Email
                </span>
              </div>
              <p className="text-sm text-text-muted">
                support@animehub.dev
              </p>
            </div>
            <div className="rounded-xl border border-border-main bg-bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-green-main" />
                <span className="text-sm font-semibold text-text-main">
                  Discord
                </span>
              </div>
              <p className="text-sm text-text-muted">
                Join our community server
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border-main bg-bg-card p-6">
            <h2 className="mb-4 font-heading text-lg font-semibold text-text-main">
              Send a Message
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-text-main"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-11 w-full rounded-xl border border-border-input bg-bg-panel px-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-text-main"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-xl border border-border-input bg-bg-panel px-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-medium text-text-main"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What is this about?"
                  className="h-11 w-full rounded-xl border border-border-input bg-bg-panel px-4 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-text-main"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  className="w-full rounded-xl border border-border-input bg-bg-panel px-4 py-3 text-sm text-text-main placeholder:text-text-muted focus:border-green-main focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="glow-green flex h-11 items-center justify-center gap-2 rounded-full bg-green-main text-sm font-semibold text-bg-main transition-all hover:-translate-y-0.5 hover:bg-green-hover"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
