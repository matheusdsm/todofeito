import MainLayout from "@/components/layout/MainLayout";
import { getSession } from "@/lib/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session ? { id: session.userId, email: session.email, role: session.role } : null;
  return <MainLayout user={user}>{children}</MainLayout>;
}
