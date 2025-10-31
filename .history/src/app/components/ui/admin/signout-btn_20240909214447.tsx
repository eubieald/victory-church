"use client";
import { signOut } from "next-auth/react";

export default function SignoutBtn() {
  const handleSignout = async () => {
    console.log('Signing out...');
    await signOut();
    console.log('Redirecting...');
  };

  return (
    <button onClick={handleSignout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
      Sign out
    </button>
  );
}