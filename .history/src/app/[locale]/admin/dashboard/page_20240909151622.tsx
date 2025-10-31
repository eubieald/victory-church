import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) { return <div>Unauthorized!</div>; }

  return <div>Welcome {session?.user?.username} to the admin dashboard! </div>;
}