const userSchema = {
  username: (value) => typeof value === 'string',
  age: (value) => typeof value === 'number',
  hobbies: (value) => Array.isArray(value),
};

export default userSchema;
