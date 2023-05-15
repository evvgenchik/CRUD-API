interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

type UsersDB = IUser[];

type UserSchema = {
  username: (value: any) => boolean;
  age: (value: any) => boolean;
  hobbies: (value: any) => boolean;
};

export { IUser, UsersDB, UserSchema };
