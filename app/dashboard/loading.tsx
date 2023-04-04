import React from "react";

const Loading = () => {
  return (
    <div className="flex bg-slate-700 justify-center items-center h-screen">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
