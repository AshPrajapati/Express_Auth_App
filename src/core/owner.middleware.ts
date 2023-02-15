import { NextFunction, Response } from "express";
import IAuthRequest from "./request.types";

const ownerMiddleware = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || req.user.id !== req.params.id)
      throw { code: 403, message: "Aceess Denied" };
    next();
  } catch (error) {
    return res.status(error.code || 400).send({ error: error.message });
  }
};

export default ownerMiddleware;
