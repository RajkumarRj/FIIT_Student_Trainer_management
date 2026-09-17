import User from "../Model/User";
import { Apperror } from "./Errorhandler";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) throw new Apperror("Log in back");

  const decode = jwt.verify(token, process.env.SECRET_KEY);

  const currentUser = await User.findById(decode.id);

  if (!currentUser) throw new Apperror("This user no longer exists", 404);

  req.user = decode;
  next();
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new Apperror("You do not have permission to access this", 403),
      );
    }

    next();
  };
};
