import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="container-fluid py-4">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;