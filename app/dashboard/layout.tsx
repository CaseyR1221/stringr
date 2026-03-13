import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { requireCurrentUser } from "@/lib/auth-session";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await requireCurrentUser();
  const userLabel = user.name.trim() || user.email;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.22),transparent_24rem),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)]">
      <DashboardNavbar userLabel={userLabel} />
      <div className="pb-16">{children}</div>
    </div>
  );
}
