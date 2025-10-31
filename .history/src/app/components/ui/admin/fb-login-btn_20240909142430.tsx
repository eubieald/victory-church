import { signIn } from 'next-auth/react';

const FacebookAuthButton: React.FC = () => {
  return (
    <button onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}>
      Sign in with Facebook
    </button>
  );
};

export default FacebookAuthButton;
