interface IUser {
  id: string;
  username: string;
  age: string;
  hobbies: string[];
}

type DB = IUser[];

export { IUser, DB };
