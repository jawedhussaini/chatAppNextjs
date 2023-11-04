"use client";

import { useContext, useEffect, useState } from "react";
import { registerNewUser } from "../services/user";
import { GloblaContext } from "../context";
import { firebaseConfig, firebaseStorageUrl } from "@/utiles";
import {initializeApp} from 'firebase/app'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

const app = initializeApp(firebaseConfig);
const storage=getStorage(app,firebaseStorageUrl)



const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [successSubmit, setSuccessSubmit] = useState(false);
  const {user,setUser}=useContext(GloblaContext)
  const [imgUrl,setImgUrl]=useState("")

  async function register() {
    const isOnline=false
    const res = await registerNewUser({
      name,
      email,
      password,
      converstation: [],
      isOnline,
      imgUrl
    });
    console.log(res);
    if (res && res.success) {
      setemail("");
      setname("");
      setpassword("");
      setSuccessSubmit(true);
      setImgUrl(null)
     
    }
  }


  const createUniqeFileName=(getFile)=>{
  const timeStamp=Date.now()
  const randowStringValue=Math.random().toString(36).substring(2,12)

  return `${getFile.name}-${timeStamp}-${randowStringValue}`
  

}

async function helperFormUplodingImageToFireBase(file){
      const getFileName=createUniqeFileName(file)
      const storageRefferance = ref(storage, `my-app/${getFileName}`);
      const uploadeImage = uploadBytesResumable(storageRefferance, file);
       return new Promise((resolve, reject) => {
       uploadeImage.on(
        "state_changed",
        (snapshot) => {}, 
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadeImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    });
}

async function handelImage(e){
console.log(e.target.files)
const extractImageUrl=await helperFormUplodingImageToFireBase(e.target.files[0])

setImgUrl(extractImageUrl)
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
             <input
            accept="/image*"
            max={1000000}
            type="file"
            onChange={handelImage}
          />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
           
              >
                Username
              </label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
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
                id="eamil"
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
              {successSubmit ? (
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              ) : (
                <button
                  type="button"
                  onClick={register}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
