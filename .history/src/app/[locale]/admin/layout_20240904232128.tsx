import React from 'react';

const AdminLoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <section>
        {children}
      </section>
    </>
  );
}

export default AdminLoginLayout;
