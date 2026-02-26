import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "View All",
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="font-heading text-2xl font-bold text-text-main">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-green-main"
        >
          {linkLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
