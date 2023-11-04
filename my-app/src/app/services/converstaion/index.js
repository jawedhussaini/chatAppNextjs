import Cookies from "js-cookie"


export const createConverstation=async(data)=>{
    try{
        const res=await fetch("/api/converstation/createCon",{
            method:"POST",
            headers:{
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body:JSON.stringify(data)
        })
        const finalData=await res.json()
        return finalData

    }
    catch(e){
        console.log(e)
    }
}
export const getConverstation=async(id)=>{
    try{
        const res=await fetch(`/api/converstation/getCon?id=${id}`,{
            method:"GET",
            headers:{
                 Authorization: `Bearer ${Cookies.get("token")}`,
            }
        })
       const data=await res.json()
       return data
    }
    catch(e){
        console.log(e)
    }
}
export const getConById=async(id)=>{
      try{
        const res=await fetch(`/api/converstation/getConById?id=${id}`,{
            method:"GET",
            headers:{
                 Authorization: `Bearer ${Cookies.get("token")}`,
            }
        })
       const data=await res.json()
       return data
    }
    catch(e){
        console.log(e)
    }
    
}
export const addComment = async (formData) => {
  try {
    const res = await fetch("/api/converstation/updateCon", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body:JSON.stringify(formData)
    });
    const response = await res.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};