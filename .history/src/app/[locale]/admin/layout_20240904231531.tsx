import React from 'react';
import Head from 'next/head';

const AdminLoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Admin Login</title>
        <meta name="description" content="Admin login page for the application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <div>
        {children}
      </div>
    </>
  );
}

export default AdminLoginLayout;
