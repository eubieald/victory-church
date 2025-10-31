"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignoutBtn() {
  const router = useRouter();

  const handleSignout = async () => {
    console.log('Signing out...');
    await signOut();
    router.push('/admin');
  };

  return (
    <button onClick={handleSignout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
      Sign out
    </button>
  );
}