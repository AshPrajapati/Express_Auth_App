import { compareSync, hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";
import userStore, { User } from "../core/user.store";
import config from "../core/config";

const convertUserForAccess = (user: User) => {
  return {
    id: user.id,
    email: user.email,
  };
};

export const signUpUser = (userData: {
  email: User["email"];
  password: User["password"];
}) => {
  const id = uuid();
  const { email, password } = userData;
  const hashedPassword = hashSync(password, 10);
  const newUser: User = {
    id,
    email,
    password: hashedPassword,
  };
  userStore.save(newUser);
  return convertUserForAccess(newUser);
};

export const signInUser = (userData: {
  email: User["email"];
  password: User["password"];
}) => {
  const { email, password } = userData;
  const foundUser = userStore.getByEmail(email);
  if (!foundUser) {
    throw new Error("Invalid Email");
  }
  if (!compareSync(password, foundUser.password)) {
    throw new Error("Invalid Password");
  }
  const accessToken = sign(convertUserForAccess(foundUser), config.JWT_SECRET);
  return accessToken;
};
