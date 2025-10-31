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