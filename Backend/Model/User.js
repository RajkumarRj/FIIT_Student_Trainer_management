import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required "],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "student", "trainer"],
      required: true,
    },
    phone: {
      type: String,
      required: [true, "Phone no is required"],
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
    },
    registerNo: {
      type: String,
    },
    designation: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.comparePassword = async function(enteredPassword, userPassword){
  return await bcrypt.compare(enteredPassword, userPassword)
}

const User = mongoose.model("User", userSchema);

export default User;
