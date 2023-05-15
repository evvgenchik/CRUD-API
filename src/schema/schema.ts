const userSchema = {
  username: (value: string) => typeof value === 'string',
  age: (value: number) => typeof value === 'number',
  hobbies: (value: []) => Array.isArray(value),
};

export default userSchema;
