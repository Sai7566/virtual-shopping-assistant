import React, { useState } from "react";
import login from "../assets/loginImg.png";
import axios from "axios"
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const onSubmitHandler = async (e) => {
    
   try {
    e.preventDefault();
    const response = await axios.post(backend_url + '/api/user/admin', {email,password})
    if (response.data.success) {
        setToken(response.data.token);
    }else{
        toast.error(response.data.message)
    }
   } catch (error) {
    console.log(error);
    toast.error(error.message)
    
   }
   
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-200">
          <img src={login} alt="Login" className="w-full h-auto" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-700">Login</h3>
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition duration-200"
            >
              Login
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;