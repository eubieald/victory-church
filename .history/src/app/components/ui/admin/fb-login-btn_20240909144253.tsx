import { signIn } from 'next-auth/react';

const FacebookAuthButton: React.FC = () => {
  return (
    <button onClick={() => signIn('facebook', { callbackUrl: '/admin/dashboard' })}>
      Sign in with Facebook
    </button>
  );
};

export default FacebookAuthButton;
