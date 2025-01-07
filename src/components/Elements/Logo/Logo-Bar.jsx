import React from "react";
import Logo from "../../../../public/logo.png";

const LogoBar = (props) => {
  const { toggle } = props;
  return (
    <div className="flex items-center gap-6">
      <img src={Logo} className={`w-16 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            } `} />
      <h1 className={`${toggle ? "" : "hidden"} text-white origin-left font-semibold text-2xl duration-500 font-head`}>
        Eternity
      </h1>
    </div>
  );
};

export default LogoBar;
