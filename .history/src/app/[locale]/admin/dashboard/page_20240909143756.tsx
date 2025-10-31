import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Log the session for debugging purposes
  console.log("Session:", session);

  if (!session?.user) {
    return <div>Unauthorized!</div>;
  }

  // Check if the user is authenticated with Facebook
  if (session.user.provider !== 'facebook') {
    return <div>Unauthorized!</div>;
  }

  return <div>Welcome {session.user.username} to the admin dashboard!</div>;
}
