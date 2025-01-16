import React from "react";
import logo from "../../assets/images/logo.png";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="bg-myBg z-20 m-16 mt-4 rounded-xl h-20 fixed top-0 left-0 right-0 ">
      {/* logo section */}
      <div className="flex m-4 justify-between items-center">
        <div>
          <img src={logo} alt="logo" className="h-10 w-10" />
        </div>
        {/* user login section */}
        <div className="flex font-overpass gap-4">
          <Button title={"Signin"} routeTo="/signin">
            Signin
          </Button>
          <Button title={"Signup"} routeTo="/signup">
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
