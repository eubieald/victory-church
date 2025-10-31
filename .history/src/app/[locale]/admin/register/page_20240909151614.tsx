"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/app/components/utils/zschema';
import { FormData } from '@/app/components/utils/types';
import FormField from '@components/ui/form-field';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('A network error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-4">Admin Signup</h1>
            <FormField
              type="text"
              placeholder="Username"
              name="username"
              register={register}
              error={errors.username}
            />

            <FormField
              type="email"
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
            />

            <FormField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
            />

            <FormField
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
            />

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Sign Up
            </button>
          </div>
          {errorMessage && <div className="text-red-500 my-4">{errorMessage}</div>}
        </form>
      </div>
    </>
  );
}
