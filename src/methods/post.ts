import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { validate } from '../utils/helper.js';
import userSchema from '../schema/schema.js';
import parser from '../utils/parser.js';
import { IUser, UsersDB } from '../utils/types.js';
import errorsMsg from '../utils/errorsMsg.js';

const postRequest = async (req: IncomingMessage, res: ServerResponse, users: UsersDB) => {
  if (req.url === '/api/users') {
    const newUser = (await parser(req)) as IUser;

    const errors = validate(newUser, userSchema);

    if (!errors.length) {
      const user = Object.assign(newUser, { id: uuidv4() });
      users.push(user);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ user }));
      res.end();
    } else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: `${errors.join(' ')}` }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorsMsg.path }));
  }
};

export default postRequest;
