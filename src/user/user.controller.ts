import { Request, Response, Router } from "express";
import { deleteById, getAllUser, getUserById } from "./user.service";
import authMiddleware from "./../core/auth.middleware";

const usersRouter = Router();

usersRouter.use(authMiddleware);

usersRouter.get("/users", (req, res) => {
  return res.status(200).send(getAllUser());
});

usersRouter.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foundUser = getUserById(id);
    if (!foundUser) {
      throw { code: 404, message: "User not found!" };
    }
    return res.send(foundUser);
  } catch (error) {
    return res.status(error.status || 400).send({ message: error.message });
  }
});

usersRouter.delete("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    deleteById(id);
    return res.send();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default usersRouter;
