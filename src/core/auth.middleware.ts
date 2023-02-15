import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "./config";
import IAuthRequest from "./request.types";
import userStore from "./user.store";

const authMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      throw { code: 403, message: "Access Denied" };
    }
    const [, token] = header.split(" ");
    if (!token) {
      throw { code: 403, message: "Access Denied" };
    }
    const tokenData: any = verify(token, config.JWT_SECRET);
    const foundUser = userStore.getById(tokenData.id);
    if (!foundUser) {
      throw new Error("User not found!");
    }
    req.user = { email: tokenData.email, id: tokenData.id };
    next();
  } catch (error) {
    return res.status(error.code || 400).send({ error: error.message });
  }
};

export default authMiddleware;
