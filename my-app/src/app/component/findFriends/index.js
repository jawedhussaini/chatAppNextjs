"use client";
import { GloblaContext } from "@/app/context";
import { useContext } from "react";
import { BiUserPlus } from "react-icons/bi";
import { createConverstation } from "@/app/services/converstaion";
const FindFriends = () => {
  const { getAllusers, user, inchatUser, setInChatUser } =
    useContext(GloblaContext);
  const userId = user !== null ? user.id : null;

  async function addFriend(frindId) {
    const datas = {
      message: [],
      users: [frindId, user?.id],
    };
    const res = await createConverstation(datas);
  }
console.log(getAllusers)
  return (
    <div className="w-full border-l-2 h-auto border-gray-300 p-4 flex flex-col gap-4">
      <div className="w-full flex justify-start">
        <span className="self-center text-gray-600 text-2xl font-semibold whitespace-nowrap -mr-16">
          Find friend
        </span>
      </div>
      <div className="w-full flex justify-start">
        {" "}
        <input
          className="appearance-none border w-full py-3 rounded-full px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="SEARCH..."
        />
      </div>
      {getAllusers && getAllusers.length
        ? getAllusers.map((items) => (
          inchatUser ?
          inchatUser.includes(items) ? null
          
          : 
           <div
                      className="w-full flex flex-row justify-between"
                      key={items._id}
                    >
                      <div className=" bg-slate- flex items-center justify-center">
                        <img
                          src={items.imgUrl}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div className="ml-2">
                          <h1 className="text-gray-600 text-sm">
                            {items.email}
                          </h1>
                          <h1 className="text-gray-500 text-xl font-extrabold">
                            {items.name}
                          </h1>
                        </div>
                      </div>

                      <div className="flex items-start justify-center flex-col pr-4">
                        <div
                          onClick={() => addFriend(items._id)}
                          className="p-2 bg-green-100 rounded-3xl cursor-pointer"
                        >
                          <BiUserPlus size={25} color="green" />
                        </div>
                      </div>
                    </div>
                    :null
        )
        

          
       ) : null}
    </div>
  );
};

export default FindFriends;
