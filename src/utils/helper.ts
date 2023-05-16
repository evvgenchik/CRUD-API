import { IncomingMessage } from 'http';
import { IUser, UserSchema } from './types.js';

const parseUrl = (req: IncomingMessage) => {
  const url = req.url as string;
  const arrUrl = url.split('/');
  const baseUrl = arrUrl.slice(0, 3).join('/');
  const id = arrUrl[arrUrl.length - 1];

  return { baseUrl, id };
};

const isUuidCorrect = (id: string) => {
  const v4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  return v4.test(id);
};

const validate = (object: IUser, schema: UserSchema) => {
  return Object.keys(schema)
    .filter((key) => {
      const keyOfUser = key as keyof IUser;
      const keyOfschema = key as keyof UserSchema;
      return !schema[keyOfschema](object[keyOfUser]);
    })
    .map((key) => `field ${key} is invalid.`);
};

export { parseUrl, isUuidCorrect, validate };
