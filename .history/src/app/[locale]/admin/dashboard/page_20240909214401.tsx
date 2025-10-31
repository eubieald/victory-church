import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignoutBtn from "@/app/components/ui/admin/signout-btn";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>Unauthorized!</div>;
  }

  return (
    <div>
      <div>Welcome {session?.user?.username} to the admin dashboard!</div>

    </div>
  );
}