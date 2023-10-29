import React from "react";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 bg-white flex items-center justify-center w-full h-full m-auto ">
      <div>
        <UseAnimations
          size={40}
          wrapperStyle={{ color: "#F79489" }}
          animation={loading2}
          fillColor={"#F79489"}
        />
      </div>
    </div>
  );
};

export default Loading;
