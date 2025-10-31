// components/FacebookAuthButton.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FacebookAuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn("facebook", { redirect: false });

    if (result?.ok) {
      // Redirect to the dashboard upon successful sign-in
      router.push('/dashboard');
    } else {
      // Handle errors or failed sign-in here
      console.error("Sign-in failed");
    }
  };

  return session ? (
    <>
      <p>Welcome, {session.user?.name}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSignIn}
    >
      Sign in with Facebook
    </button>
  );
};

export default FacebookAuthButton;
