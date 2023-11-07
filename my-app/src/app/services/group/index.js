
import Cookies from "js-cookie"


export const createGruop=async (data)=>{
    try{
       const res=await fetch("/api/group/createGroup",{
        method:"POST",
          headers:{
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body:JSON.stringify(data)

       })
       const resposne=await res.json()
       return resposne
    }
    catch(e){
        console.log(e)
    }
}