import Link from "next/link";

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-text-main md:text-4xl">
          DMCA Policy
        </h1>
        <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-text-secondary">
          <p>
            AnimeHub respects the intellectual property rights of others and
            expects its users to do the same. We will respond promptly to
            notices of alleged copyright infringement that comply with the
            Digital Millennium Copyright Act (DMCA).
          </p>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              Content Hosting Disclaimer
            </h2>
            <p>
              AnimeHub does not host any video content on its servers. All
              streams are sourced from third-party providers. We act as an
              aggregation and discovery service only.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              Filing a DMCA Takedown Notice
            </h2>
            <p>If you believe your copyrighted work has been infringed, please provide the following information:</p>
            <ul className="mt-2 flex flex-col gap-2 pl-4">
              {[
                "Identification of the copyrighted work claimed to have been infringed",
                "Identification of the material that is claimed to be infringing and its location on our site",
                "Your contact information (name, address, telephone, email)",
                "A statement that you have a good faith belief that the use is not authorized",
                "A statement, under penalty of perjury, that the information is accurate and you are the copyright owner",
                "Your physical or electronic signature",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-main" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              Contact for DMCA Requests
            </h2>
            <p>
              Send DMCA notices to:{" "}
              <span className="text-green-main">dmca@animehub.dev</span>
            </p>
            <p className="mt-2">
              You can also reach us through our{" "}
              <Link
                href="/contact"
                className="text-green-main hover:underline"
              >
                contact page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-heading text-xl font-semibold text-text-main">
              Response Time
            </h2>
            <p>
              We aim to process all valid DMCA requests within 48–72 hours.
              Repeated infringement may result in content removal and user
              account termination.
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
