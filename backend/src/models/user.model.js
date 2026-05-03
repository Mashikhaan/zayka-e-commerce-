/**
 * user schema create
 */

import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    verified: {
    type: Boolean,
    default: false,
  },
    avatar: {
    type: String,
    default: ""
  }
})

/**
 * Mongoose ka inbuilt feature userSchema.pre()
 * 👉 pre() = middleware (hook) function
 * 'save' ek Mongoose document lifecycle event hai.
 */
// Update updatedAt before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});
/**
 * schema.methods Mongoose ka built-in feature hai jo aapko custom instance methods define karne ki suvidha deta hai.
 * comparePassword ek custom method hai jo user instances par call kiya ja sakta hai.
 * ab jha user hoga uske saath poore server me comparePassword jayega qki userSchema.methods.comparePassword kiya h 
 */
// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

//model create
const userModel = mongoose.model("user",userSchema)

export default userModel;