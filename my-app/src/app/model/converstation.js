import mongoose from "mongoose";


const ConverstationSchema=new mongoose.Schema({
    message:[{
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        message:String
        
                }],
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]    


})


const Converstation=mongoose.models.Converstation || mongoose.model("Converstation",ConverstationSchema)

export default Converstation
