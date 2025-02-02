import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignIn = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Real-time password matching check
    if (password && value && password !== value) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
    // setUserData({
    //   fullName: {
    //     firstName: firstName,
    //     lastName: lastName,
    //   },
    //   email: email,
    //   password: password,
    // });
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status == 201) {
      const data = response.data;
      console.log(data);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-5"
          src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
          alt="uber logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2 mg-2 gap-2">
            What's your name?
          </h3>
          <div className="flex flex-row mb-5">
            <input
              className="bg-[#eeeeee] w-1/2  mr-1 rounded px-4 py-2 border  text-lg plateholder:text-base"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg plateholder:text-base"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2 mg-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg plateholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2 mg-2">Enter password</h3>
          <div>
            <input
              className="bg-[#eeeeee] mb-2.5 rounded px-4 py-2 border w-full text-lg plateholder:text-base"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
            <input
              className="bg-[#eeeeee] mb-5 rounded  px-4 py-2 border w-full text-lg plateholder:text-base"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              placeholder="Confim Password"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 mb-3 text-sm">{errorMessage}</p>
          )}

          <button className="bg-[#111] w-full text-white font-semibold mb-5 rounded px-4 py-2 md-0">
            Login
          </button>
        </form>
        <div>
          <p className="">Already have account?</p>
          <Link className="text-blue-500" to="/login">
            Login to Account
          </Link>
        </div>
      </div>
      <div className="mt-7">
        <p className="text-[12px]">
          By proceeding, you agree to Uber's Terms and Conditions and Privacy
          Policy, allowing access for calls and communication related to
          services. Review our policies to understand data usage.
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
