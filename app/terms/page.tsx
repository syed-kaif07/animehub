export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-text-main md:text-4xl">
          Terms of Service
        </h1>
        <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-text-secondary">
          <p>
            Welcome to AnimeHub. By accessing and using this website, you accept
            and agree to be bound by the terms and provisions of this agreement.
          </p>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              1. Acceptance of Terms
            </h2>
            <p>
              By using AnimeHub, you agree to these Terms of Service. If you do
              not agree to these terms, please do not use our platform. We
              reserve the right to modify these terms at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              2. User Accounts
            </h2>
            <p>
              You may create an account to access personalized features. You are
              responsible for maintaining the security of your account and all
              activities that occur under it.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              3. Content Usage
            </h2>
            <p>
              AnimeHub aggregates anime content from various external sources.
              We do not host or store any video content on our servers. All
              content is provided by third-party services.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              4. Community Guidelines
            </h2>
            <p>
              Users must respect other community members. Harassment, spam, and
              inappropriate content will not be tolerated and may result in
              account suspension.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              5. Intellectual Property
            </h2>
            <p>
              All anime titles, artwork, and related intellectual property belong
              to their respective owners. AnimeHub respects intellectual property
              rights and will respond to valid takedown requests.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              6. Limitation of Liability
            </h2>
            <p>
              AnimeHub is provided on an &ldquo;as is&rdquo; basis. We make no
              warranties regarding the availability, accuracy, or reliability of
              the service.
            </p>
          </section>

          <p className="text-sm text-text-muted">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}
