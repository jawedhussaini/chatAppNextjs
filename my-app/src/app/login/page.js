"use client";

import { useContext, useEffect, useState } from "react";
import { registerNewUser } from "../services/user";
import { login } from "../services/login";
import { GloblaContext } from "../context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const {user,setUser,isAuthUser,setIsAuthUser}=useContext(GloblaContext)
  const router=useRouter()
 


  async function handelLogIn() {
    const res = await login({
      email,
      password,
    });
    
   
    if (res.success) {
      setemail("");
      setpassword("");
      setUser(res?.data?.user)
      setIsAuthUser(true)
      Cookies.set('token',res?.data?.token)
      localStorage.setItem('user',JSON.stringify(res?.data?.user))
      router.push('/mainPage')
      
      

      
    }
  }
console.log(user)
  return (
    <div className="w-screen bg-gray-100 h-screen p-6 flex items-center justify-center">
      <div className="md:w-full lg:w-1/3 sm:w-full p-5 rounded-3xl rounded-2x bg-white border-gray-900">
        <div className="w-full p-4 flex flex-col gap-5">
          <div className="w-full flex items-center justify-center">
            <img src="/logo.png" className="w-12 h-12" />
          </div>

          <form className="bg-white rounded px-8 pt-2 pb-8 mb-4">
           
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
               
              >
                Email
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                value={email}
                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
              
              >
                Password
              </label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="password"
              />
            </div>
            <div className="flex flex-col w-1/4 gap-3  md:w-1/2 sm:w-full">
          
              
           
                <button
                  type="button"
                  onClick={handelLogIn}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
