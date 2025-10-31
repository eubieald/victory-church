import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Log the session object for debugging
  console.log("Session:", session);

  // Check if the user is authenticated with Facebook
  if (!session?.user) {
    return <div>Unauthorized!</div>;
  }

  // If the session object does not directly include provider info, consider other approaches
  // For example, you might need to check for the provider in the `accounts` array
  if (!session.user.email || !session.user.email.endsWith('@facebook.com')) {
    return <div>Unauthorized!</div>;
  }

  return <div>Welcome {session.user.username} to the admin dashboard!</div>;
}
