import React from 'react';
import Head from 'next/head';

const AdminLoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <div>
        {children}
      </div>
    </>
  );
}

export default AdminLoginLayout;
