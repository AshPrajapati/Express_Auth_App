import { NextFunction, Request, Response, Router } from "express";
import { signInUser, signUpUser } from "./auth.service";

const authRoutes = Router();

authRoutes.post(
  "/auth/signup",
  (req: Request, res: Response, _next: NextFunction) => {
    try {
      return res.send(signUpUser(req.body));
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
);

authRoutes.post(
  "/auth/signin",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = signInUser(req.body);
      return res.send({ accessToken });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
);

export default authRoutes;
