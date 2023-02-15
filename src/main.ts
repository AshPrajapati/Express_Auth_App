import * as express from "express";
import authRoutes from "./auth/auth.controller";
import userRoutes from "./user/user.controller";

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);

app.listen(8080);
