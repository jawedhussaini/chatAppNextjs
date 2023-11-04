
export const login=async(formdata)=>{
    try{
        const reponse=await fetch('/api/user/login',{
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify(formdata)
        })
        const data=await reponse.json()
        return data

    }
    catch(error){
        console.log(error)
    }
}