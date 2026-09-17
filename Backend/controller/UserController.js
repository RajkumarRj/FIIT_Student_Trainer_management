import { Apperror } from "../Middleware/Errorhandler.js";
import User from "../Model/User.js";
import { generateRegisterNo } from "../utils/GenerateRegisterNo.js";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  const { name, email, password, phone, branch } = req.body;

  if (!name || !email || !password || !branch) {
    throw new Apperror("All field are required", 400);
  }

  const count = await User.countDocuments({ branch: `${branch}` });

  const newUser = {
    name,
    email,
    password,
    role: "student",
    phone,
    branch,
    registerNo: generateRegisterNo(count + 1, branch),
  };

  const createdUser = await User.create(newUser);

  await createdUser.save();

  const userData = createdUser.toObject();
  delete userData.password;

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    createdUser: userData,
  });
};

export const registerTrainer = async (req, res) => {
  const { name, email, password, phone, branch, designation } = req.body;

  if (!name || !email || !phone || !password || !branch || !designation) {
    throw new Apperror("All field are required", 400);
  }

  const newUser = {
    name,
    email,
    password,
    role: "trainer",
    phone,
    branch,
    designation,
  };

  const createdUser = await User.create(newUser);

  await createdUser.save();

  const userData = createdUser.toObject();
  delete userData.password;

  res.status(201).json({
    success: true,
    message: "Trainer created successfully",
    createdUser: userData,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  if (!email || !password) {
    throw new Apperror("Please provide email and password", 400);
  }


  const existsUser = await User.findOne({ email });

  if (!existsUser) {
    throw new Apperror(
      "Email not found , try registering contact admin team",
      404,
    );
  }

  if (!existsUser.comparePassword(password, existsUser.password)) {
    throw new Apperror("Password not match", 401);
  }

  const payload = {
    name: existsUser.name,
    email: existsUser.email,
    role: existsUser.role,
    designation: existsUser?.designation,
    phone: existsUser.phone,
    registerNo: existsUser?.registerNo,
    branch: existsUser.branch,
  };
  console.log(payload);

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5d" });

  res.status(200).json({
    success: true,
    message: `Logged in successfully - ${existsUser.name} - ${existsUser.role}`,
    token,
  });
};


