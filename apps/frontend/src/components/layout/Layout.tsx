import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[15rem_1fr] h-screen font-sans">
      <Sidebar />
      <main className="h-full flex-1 px-8 py-12">{children}</main>
    </div>
  );
};

export default Layout;
