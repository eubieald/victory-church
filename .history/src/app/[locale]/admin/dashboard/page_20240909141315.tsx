import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Check if there is a session and if the user is authenticated via Facebook
  if (!session?.user || session?.user?.provider !== 'facebook') {
    return <div>Unauthorized!</div>;
  }

  return <div>Welcome {session.user.username} to the admin dashboard!</div>;
}
