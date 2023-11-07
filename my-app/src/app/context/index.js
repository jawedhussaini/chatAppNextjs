"use client";

import Cookies from "js-cookie";

const { createContext, useState, useEffect } = require("react");

export const GloblaContext = createContext(null);

export default function GloblaState({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [getAllusers, setGetAlluser] = useState(null);
  const [getAllCon, setGetAllCon] = useState(null);
  const [getCurrentCon,setGetCurrentCon]=useState(null)
  const [inchatUser,setInChatUser]=useState(null)
  const [onlineUsers,setOnlineUSers]=useState(null)
  const [groupModel,setGroupModel]=useState(false)

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const data = JSON.parse(localStorage.getItem("user")) || {};
      const currentCon = JSON.parse(localStorage.getItem("currentCon")) || {};
      setUser(data);
      setGetCurrentCon(currentCon)
    }
  }, [Cookies]);

  return (
    <GloblaContext.Provider
      value={{
        user,
        setUser,
        isAuthUser,
        setIsAuthUser,
        getAllusers,
        setGetAlluser,
        getAllCon,
        setGetAllCon,
        getCurrentCon,
        setGetCurrentCon,
        inchatUser,
        setInChatUser,
        onlineUsers,
        setOnlineUSers,
        groupModel,
        setGroupModel
      }}
    >
      {children}
    </GloblaContext.Provider>
  );
}
