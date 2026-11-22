import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-violet-900 from-10% via-violet-400  to-violet-900">
      <img
        src={`${process.env.PUBLIC_URL}/i.png?v=2`}
        alt="EXurance logo"
        className="absolute top-3 left-3 h-10 w-10 object-contain bg-transparent"
      />
      {children}
    </div>
  );
};

export default PublicLayout;
