import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({});

  const [errorMessage, setErrorMessage] = useState();

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const navigate = useNavigate();

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
    console.log(
      firstName,
      lastName,
      email,
      password,
      vehicleColor,
      vehiclePlate,
      vehicleCapacity,
      vehicleType
    );
    if (!vehicleColor || !vehiclePlate || !vehicleCapacity || !vehicleType) {
      setErrorMessage("Please fill in all vehicle details");
      return;
    }
    setErrorMessage("");

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    console.log(userData);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <h4>captain</h4>
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
            What's our Captain's name?
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

          <h3 className="text-lg font-medium mb-2 mg-2">
            What's our Captain's email?
          </h3>
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

          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <div>
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg"
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value.toUpperCase())}
              required
              placeholder="Vehicle Color"
              style={{ textTransform: "uppercase" }}
            />
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg"
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value.toUpperCase())}
              required
              placeholder="e.g., MH12AB1234"
              pattern="^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$"
              title="Enter a valid Indian plate number format: e.g., MH12AB1234"
              style={{ textTransform: "uppercase" }}
            />
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg"
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              min="1"
              placeholder="Vehicle Capacity (Min: 1)"
            />
            <select
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="suv">SUV</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
              <option value="bus">Bus</option>
            </select>
          </div>

          {errorMessage && (
            <p className="text-red-500 mb-3 text-sm">{errorMessage}</p>
          )}

          <button className="bg-[#111] w-full text-white font-semibold mb-5 rounded px-4 py-2 md-0">
            Create Account
          </button>
        </form>
        <div>
          <p className="">Already have account?</p>
          <Link className="text-blue-500" to="/captain-login">
            Login here
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

export default CaptainSignup;
