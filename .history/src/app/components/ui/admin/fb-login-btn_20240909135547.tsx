// components/AuthButton.js
import { signIn, signOut, useSession } from "next-auth/react";

const FacebookAuthButton = () => {
  const { data: session } = useSession();

  return session ? (
    <>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn("facebook")}>Sign in with Facebook</button>
  );
};

export default FacebookAuthButton;
