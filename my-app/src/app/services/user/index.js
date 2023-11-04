import Cookies from "js-cookie";



export const registerNewUser = async (formData) => {
  try {
    const response = await fetch("/api/user/createUser", {
      method:"POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const finnalData =await response.json();
    return finnalData;
  } catch (e) {
    console.log("erroreeeeeeeee", e);
  }
};


export const allUsers=async ()=>{
  try{
     const res=await fetch("http://localhost:3001/api/user/getAllUser",{
      method:"GET",
      headers:{
        Authorization: `Bearer ${Cookies.get("token")}`,
      }
     })
     const finalData=await res.json()
     return finalData
  }
  catch(e){
    console.log(e)
  }
}