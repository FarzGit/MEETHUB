import mongoose from "mongoose";

const DB_STRING:string = process.env.MONGO_DB || ""

const connectDb = async()=>{
    try {
        await mongoose.connect(DB_STRING)
        .then((data)=>{
            console.log(`Database connected ${data.connection.host}`)
        })
        
    } catch (error) {
        console.log(error)
        setTimeout(connectDb,5000)
        
    }
}

export default connectDb