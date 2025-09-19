"use client";

import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="my-2 w-full">
      <ol className="flex flex-wrap text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className="flex items-center max-w-[120px] sm:max-w-none truncate"
            >
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:underline truncate"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-black font-medium truncate">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="mx-1 sm:mx-2 text-gray-400">{">"}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
