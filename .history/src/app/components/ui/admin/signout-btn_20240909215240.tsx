"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignoutBtn() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      console.log('Signing out...');
      // The `signOut` function returns a Promise, so await it.
      await signOut({ redirect: false }); // `redirect: false` ensures that the redirection is handled manually.
      router.push('/admin');
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  return (
    <button onClick={handleSignout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
      Sign out
    </button>
  );
}
