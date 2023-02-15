export interface User {
  id: string;
  email: string;
  password: string;
}

class UserStore {
  private users: User[];
  constructor() {
    this.users = [];
  }
  save(newUser: User) {
    if (this.getByEmail(newUser.email)) {
      throw new Error("User Email is already in use");
    }
    this.users.push(newUser);
  }
  delete(id: string) {
    const foundUserIdx = this.users.findIndex((currUser) => currUser.id === id);
    if (foundUserIdx === -1) {
      throw new Error("User not found!");
    }
    this.users = this.users.filter((currUser) => currUser.id !== id);
  }
  getById(id: string) {
    return this.users.find((currUser) => currUser.id === id);
  }
  getByEmail(email: string) {
    return this.users.find((currUser) => currUser.email === email);
  }
  getAll(): User[] {
    return this.users;
  }
}

const userStore = new UserStore();

export default userStore;
