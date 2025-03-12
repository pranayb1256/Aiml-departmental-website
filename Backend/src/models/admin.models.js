import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

//this schema is specifically designed for only 1 user i.e. 'ADMIN' 
const adminSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        unique: true,
        required: [true, "Password is required"],
    },
    jwtToken: {
        type: String,
    }
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);

    next();
});
adminSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
