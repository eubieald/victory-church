"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/app/components/utils/zschema';
import { FormData } from '@/app/components/utils/types';
import FormField from '@components/ui/form-field';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();  // Moved useRouter to the top

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const signInData = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    });

    if (signInData?.error) {
      console.log(signInData.error);  // Consider setting an error state here to show user-friendly messages
    } else {
      router.push('/admin/dashboard');  // Navigate to dashboard upon successful sign-in
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold mb-4">Admin Login</h1>

          <FormField
            type="text"
            placeholder="Username"
            name="username"
            register={register}
            error={errors.username}
          />

          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>

          <button className="bg-blue-500 text-white ml-5 py-2 px-4 rounded-md">
            <Link href="/admin/register">
              <span >Register</span>
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
