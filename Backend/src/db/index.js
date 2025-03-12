import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"
const connectDB = async () => {
    try {
        console.log("db name: ", DB_NAME);
        
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongodb connected !! DB Host ${connectInstance.connection.host}`);

    }
    catch (err) {
        console.log("MONGODB CONNECTION FAILED(in src/db): ", err);
        process.exit(1);
    }
}
export default connectDB;