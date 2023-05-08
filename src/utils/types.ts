interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

type usersDB = IUser[];

export { IUser, usersDB };
