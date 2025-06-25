import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { FaGoogle } from "react-icons/fa6";
import { Form, Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn, isLoading, error, user } = useAuthStore();

  //logic for handling any form submission
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn(email, password);
    navigate("/listing");
    console.log(email, password);
  };

  return (
    <main className="bg-gradient-to-r from-violet-600 to-indigo-600 flex justify-center items-center h-screen">
      <div className="bg-white p-[20px] rounded-2xl text-center">
        <h1 className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-bold lg:text-[30px]">
          Hello admin Login To Your account
        </h1>
        <h2>Enter your details to proceed</h2>
        <div className="flex items-center gap-[20px] justify-center bg-white p-[10px] border rounded-2xl font-bold hover:bg-gray-50 hover:cursor-pointer hover:transition-all duration-[0.3s] hover:duration-[0.3s] mt-[30px]">
          <FaGoogle />
          <h1>Login using google</h1>
        </div>
        <p className="mt-[30px]">---Or proceed with your email----</p>
        <Form onSubmit={handleSubmit} method="post" className="lg:w-[600px]">
          <label className="float-left font-light" htmlFor="email">
            Email adress
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Adress"
            className="bg-white border rounded-[5px] lg:p-[10px] w-full p-[10px]"
          />
          {/* <small className="m-[5px] text-red-500 float-left">{error}</small> */}

          <label className="float-left font-light" htmlFor="email">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-white border-gray-700 border rounded-[5px] lg:p-[10px] w-full p-[10px]"
          />

          <button
            className={`
                bg-gradient-to-r from-violet-600 to-indigo-600 
                p-3 rounded-lg mt-5 w-full 
                text-xl font-medium text-white 
                transition-all duration-300
                ${error ? "bg-red-500" : ""}
                ${
                  isLoading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:opacity-90 hover:shadow-md"
                }
              `}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <Link to={"/listing"}>Just a sec...</Link>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </Form>
        <h3 className="my-[20px]">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="font-bold text-blue-600">
            Sign up here
          </Link>
        </h3>
      </div>
    </main>
  );
}
