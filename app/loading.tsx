import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

type Props = {};

const LoadingScreen = (props: Props) => {
  return (
    <div className="flex items-center p-10 justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingScreen;
