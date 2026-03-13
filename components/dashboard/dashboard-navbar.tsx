"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/racquets",
    label: "Racquets",
  },
] as const;

type DashboardNavbarProps = {
  userLabel: string;
};

function getInitials(label: string) {
  const parts = label.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "ST";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function DashboardNavbar({ userLabel }: DashboardNavbarProps) {
  const pathname = usePathname();
  const initials = getInitials(userLabel);

  return (
    <header className="sticky top-0 z-40 pt-4">
      <div className="container">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/65 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" />
          <div className="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-sky-300/20 blur-3xl" />

          <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Link className="flex min-w-0 items-center gap-3" href="/dashboard">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-[0.18em] text-white shadow-sm">
                  SR
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-[0.18em] text-slate-950 uppercase">
                    Stringr
                  </p>
                  <p className="truncate text-sm text-slate-600">
                    Smart gear tracking with a court-ready edge.
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:flex-1 lg:justify-end">
              <nav className="flex flex-wrap gap-2">
                {navigation.map((item) => {
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "rounded-full border border-transparent px-4 text-slate-600 hover:border-slate-200/80 hover:bg-white/80 hover:text-slate-950",
                        isActive &&
                          "border-slate-200/80 bg-slate-950 text-white shadow-sm hover:border-slate-950 hover:bg-slate-950 hover:text-white",
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3 self-start rounded-full border border-white/80 bg-white/70 px-3 py-2 shadow-sm sm:self-auto">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold tracking-[0.18em] text-sky-700">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Active profile
                  </p>
                  <p className="max-w-40 truncate text-sm font-medium text-slate-900">{userLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
