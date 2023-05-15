interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

type UsersDB = IUser[];

export { IUser, UsersDB };
