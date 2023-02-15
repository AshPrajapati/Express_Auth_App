import userStore, { User } from "../core/user.store";

const transformUserForResponse = (user: User) => {
  return {
    id: user.id,
    email: user.email,
  };
};

export const getAllUser = () => {
  return userStore
    .getAll()
    .map((currUser) => transformUserForResponse(currUser));
};

export const getUserById = (userId: string) => {
  return transformUserForResponse(userStore.getById(userId));
};

export const deleteById = (userId: string) => {
  userStore.delete(userId);
};
