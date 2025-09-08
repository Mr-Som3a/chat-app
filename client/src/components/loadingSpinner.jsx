import React from "react";

const LoadingSpinner = ({scale}) => {

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className={`loading loading-spinner ${scale?"scale-110 loading-xl":""} `}></div>
    </div>
  );
};

export default LoadingSpinner;
