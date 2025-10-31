"use client";

import { signOut } from "next-auth/react";

export default function SignoutBtn() {
  const handleSignout = async () => {
    console.log('Signing out...');
    await signOut();
    console.log('Redirecting...');
  };

  return (
    <button onClick={handleSignout}>
      Sign out
    </button>
  );
}