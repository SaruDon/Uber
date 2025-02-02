import React from "react";
import { Link } from "react-router-dom";
import UserLogin from "./UserLogin";

const Start = () => {
  return (
    <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  h-screen pt-8 flex justify-between  flex-col w-full">
      <img
        className="w-20 ml-8"
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC8xN1wvNTUxMFwvMmM3MTkyZDM1NGQ0YjA2YWFhZTgzZDc5Yzc2MzYwNWMtMTYyMDM3Nzc0OC5haSJ9:postmates:cvkkT2vHrzRiGiujqpqbVFn9z8dn773yTgVOCePXowk?width=2400"
        alt="uber logo"
      />
      <div className="bg-white pb-5 py-5 px-5">
        <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <Link
          to={"./login"}
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded-md mt-5"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
