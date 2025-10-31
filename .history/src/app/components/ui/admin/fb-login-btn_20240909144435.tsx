import { signIn } from 'next-auth/react';

const FacebookAuthButton: React.FC = () => {
  const handleSignIn = async () => {
    console.log('Signing in with Facebook...');
    await signIn('facebook', { callbackUrl: '/admin/dashboard' });
    console.log('Redirecting...');
  };

  return (
    <button onClick={handleSignIn}>
      Sign in with Facebook
    </button>
  );
};

export default FacebookAuthButton;
