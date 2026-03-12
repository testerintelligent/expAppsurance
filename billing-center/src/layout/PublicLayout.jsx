// layouts/PublicLayout.jsx
import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-purple-100 to-purple-400">
      {children}
    </div>
  );
};

export default PublicLayout;
