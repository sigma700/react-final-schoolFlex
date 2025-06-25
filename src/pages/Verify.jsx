import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Toast from "./components/toast";
import ToastElement from "./components/toast";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { verifMail, isLoading, error, isAuthenticated } = useAuthStore();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = e.target.nextElementSibling;
        if (nextInput) {
          return nextInput.focus();
        }
      }
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log(otpCode);

    if (otpCode.length !== 6) {
      console.log("Make sure that the otp code is 6-digits-in number");
    }

    try {
      await verifMail(otpCode);
      console.log("Email verified successfully !");
      navigate("/listing");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="bg-gradient-to-r flex-col lg:gap-[30px] from-violet-600 to-indigo-600 h-screen flex justify-center items-center">
      <div className="flex flex-col w-full h-full lg:h-fit items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl shadow-sky-100 lg:p-[30px] max-w-fit lg:mx-8 lg:my-8">
        <h2 className="text-sky-600 text-[35px] mb-4 lg:text-[30px] font-bold">
          Verify Your Email
        </h2>
        <p className="text-sky-700 mb-8 text-center">
          Please enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleSubmit} className="p-[20px] flex gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              className="lg:w-10 w-8 h-10 text-2xl text-center border border-sky-300 rounded-lg bg-blue-50 text-sky-500 focus:outline-none shadow-sm focus:ring-2 focus:ring-sky-200"
              required
              autoFocus={idx === 0}
            />
          ))}
          <button
            type="submit"
            disabled={isLoading}
            className="ml-4 px-6 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white border-none rounded-lg font-bold cursor-pointer shadow-sm hover:shadow-md transition-shadow disabled:opacity-70"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
        {/* {error && (
          <p className="text-red-500 mb-4 font-bold lg:text-[20px] transition-all duration-[0.3s]">
            {error}
          </p>
        )} */}
        <span className="text-sky-600 text-sm">
          Didn&apos;t receive the code?{" "}
          <a href="#" className="text-sky-500 underline">
            Resend
          </a>
        </span>
      </div>
      {isAuthenticated ? <ToastElement /> : ""}
    </main>
  );
}
