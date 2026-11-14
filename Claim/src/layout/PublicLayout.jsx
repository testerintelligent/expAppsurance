import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-violet-900 from-10% via-violet-400  to-violet-900">
      {children}
    </div>
  );
};

export default PublicLayout;
