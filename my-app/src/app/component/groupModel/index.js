"use client";

import { GloblaContext } from "@/app/context";
import { useContext, useEffect, useState } from "react";
import { BiMessageAdd } from "react-icons/bi";
import {BiCheck} from 'react-icons/bi'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {initializeApp} from 'firebase/app'
import { firebaseConfig, firebaseStorageUrl } from "@/utiles";
import { createGruop } from "@/app/services/group";

const app = initializeApp(firebaseConfig);
const storage=getStorage(app,firebaseStorageUrl)

const GroupModel = () => {
  const { setGroupModel, user, getAllCon } = useContext(GloblaContext);
  const userId = user !== null ? user._id : null;
  const [friendForCreateGroup, setFriendForCreateGroup] = useState(null);
  const [selectedFrends,setselectedFreinds]=useState([])
  const [groupName,setgroupName]=useState('')
  const [imgUrl,setImgUrl]=useState("")


async function registerGroup(){
  const res=await createGruop({
    groupName,
    imgUrl,
    creator:userId,
    users:selectedFrends,
    message:[]

  })
 if(res.success){
  setgroupName('')
  setImgUrl('')
  setselectedFreinds([])
 }
}





  useEffect(() => {
    if (user !== null && getAllCon !== null) {
      const conUsers = getAllCon.map((con) => con.users).flat();
      const friend = conUsers.filter((use) => use._id !== user.id);
      setFriendForCreateGroup(friend);
    }
  }, [user, getAllCon]);





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



  return (
    <div className="w-full h-screen fixed top-0 opacity-90 z-[60] flex justify-center items-center bg-gray-500">
      <div
        onClick={() => setGroupModel(false)}
        className="p-2 px-4 bg-black text-2xl text-white absolute top-8 right-8 cursor-pointer rounded-full"
      >
        X
      </div>
      <div className="w-[33rem] flex flex-col justify-between overflow-scroll h-[45rem] bg-white border-none rounded-3xl">
        <div className="flex flex-col gap-2">
          <div className="flex border-b-2 border-gray-100 pb-4 border flex-col items-start pt-7 px-7 justify-start">
            <h1 className="uppercase text-xl text-gray-900 font-semibold">
              create new group
            </h1>
            <h1 className="text-lg mt-3 font-semibold text-gray-700">
              please create group whit more than two user
            </h1>
          </div>
          <div className="flex flex-col w-full p-6 pt-3">
            <form className="flex flex-col gap-2">
              <label
                class="block text-gray-500 text-lg font-bold"
                for="file_input"
              >
                Upload file
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-3 px-2"
                id="file_input"
                type="file"
                 onChange={handelImage}
              />

              <label className="block text-gray-500 text-lg font-bold">
                Group Name
              </label>
              <input
              onChange={(e)=>setgroupName(e.target.value)}
                id="username"
                placeholder="Group name"
                type="text"
                value={groupName}
                className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              />
            </form>
          </div>
          <div className="flex flex-col w-full px-6 bg-gray-100 py-3">
            <div className="flex  flex-row gap-2">
              {selectedFrends && selectedFrends.length
                ? selectedFrends.map((friend) => (
                    <div className="fex relative">
                      <div className="w-full relative flex items-center justify-center">
                        <img
                          src={friend.imgUrl}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div onClick={()=>setselectedFreinds(()=>selectedFrends.filter(fr=>fr!==friend))} className="h-6 w-6 absolute -right-2 -top-[0.5rem] rounded-full border-white border-2 bg-black text-white flex justify-center items-center cursor-pointer  shadow-white shadow-2xl">
                          x
                        </div>
                      </div>
                    </div>
                  ))
                : null}

           
            </div>
          </div>
          <div className="flex flex-col w-full px-6 py-3">
            <div className="p-2 flex flex-col gap-2">
              <div className="flex h-auto flex-col gap-3">
                {friendForCreateGroup && friendForCreateGroup.length
                  ? friendForCreateGroup.map((friend) => 
                  selectedFrends.indexOf(friend) ===-1 ?  (
                      <div className="w-full flex flex-row justify-between gap-2">
                        <div className="flex flex-row justify-center items-center gap-3">
                          <img
                            src={friend.imgUrl}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="flex items-center -pl-20 justify-center text-gray-600 font-semibold">
                            {friend.name}
                          </div>
                        </div>
                        <div
                        
                          onClick={() => setselectedFreinds((pre)=>[...pre,friend])}
                          className="p-2 bg-green-100 hover:bg-green-200 rounded-3xl cursor-pointer"
                        >
                          <BiMessageAdd size={25} color="green" />
                        </div>
                      </div>
                    ) :
                     (
                      <div className="w-full flex flex-row justify-between gap-2">
                        <div className="flex flex-row justify-center items-center gap-3">
                          <img
                            src={friend.imgUrl}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div className="flex items-center -pl-20 justify-center text-gray-600 font-semibold">
                            {friend.name}
                          </div>
                        </div>
                        <div
                        
                          
                          className="p-2 bg-blue-100 rounded-3xl "
                        >
                          <BiCheck size={25} color="blue" />
                        </div>
                      </div>
                    )
                  
                 )
                  : null}
              </div>
            </div>
          </div>
        </div>
          <button
                  type="button"
                  onClick={registerGroup}
                  className=" bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-8 mx-8 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Group
                </button>
      </div>
    </div>
  );
};
export default GroupModel;
