import { Schema , model } from "mongoose";
import bcryptjs from "bcryptjs";

const AdminSchema = new Schema({
    FirstName :{
        type : String,
        required : true
    },
    LastName :{
        type : String,
        required : true
    },
    Email :{
        type : String,
        required : true,
        unique : true
    },
    Password: {
        type : String,
        required : true
    }
},{timestamps : true});


AdminSchema.pre("save",async (next)=>{
    if(!this.isModified("Password")) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        this.Password = await bcryptjs.hash(this.Password,salt);
        next();
    } catch (error) {
        next(error);
    }
})

export const Admin = model("Admin",AdminSchema);