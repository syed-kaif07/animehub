export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-text-main md:text-4xl">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-text-secondary">
          <p>
            Your privacy is important to us. This privacy policy explains what
            personal data we collect and how we use it.
          </p>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              1. Information We Collect
            </h2>
            <p>
              We collect minimal information necessary to provide our service.
              This may include email addresses for account creation, usage
              analytics, and device information for performance optimization.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              2. How We Use Your Information
            </h2>
            <p>
              We use collected information to provide and improve the service,
              personalize your experience, maintain security, and communicate
              important updates.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              3. Data Storage
            </h2>
            <p>
              We store your data securely using industry-standard encryption. We
              do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              4. Cookies
            </h2>
            <p>
              We use essential cookies for functionality and optional analytics
              cookies to understand usage patterns. You can manage cookie
              preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              data at any time. Contact us to exercise these rights.
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
