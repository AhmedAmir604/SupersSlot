import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-indigo-900 relative overflow-hidden h-screen">
      <img
        src="/images/construction-bg.jpg" // Ensure this path is correct
        className="absolute h-full w-full object-cover"
        alt="Background"
      />
      <div className="inset-0 bg-black opacity-25 absolute"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="w-full font-mono flex flex-col items-center relative z-10">
          <h1 className="font-extrabold text-5xl text-center text-white leading-tight">
            This Page is Under Construction
          </h1>
          <p className="font-extrabold text-4xl my-32 text-white">
            We’re working hard to get it up and running!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
