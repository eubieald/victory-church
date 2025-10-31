// pages/dashboard.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated with Facebook
  if (!session?.user || (session?.user as { provider?: string })?.provider !== 'facebook') {
    return <div>Unauthorized!</div>;
  }

  return <div>Welcome {session.user.username} to the admin dashboard!</div>;
}
