import { v4 as uuidv4 } from 'uuid';
import users from '../data/data.json' assert { type: 'json' };
import { validate } from '../utils/helper.js';
import userSchema from '../schema/schema.js';
import fileRecorder from '../utils/fileRecorder.js';
import parser from '../utils/parser.js';
import { IUser } from '../utils/types.js';

const postRequest = async (req, res) => {
  if (req.url === '/api/users') {
    const newUser = (await parser(req)) as IUser;

    const errors = validate(newUser, userSchema);

    if (!errors.length) {
      const user = Object.assign(newUser, { id: uuidv4() });
      fileRecorder([...users, user]);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: `user ${user.username} was successfully created` }));
      res.end();
    } else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: `${errors.join(' ')}` }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

export default postRequest;
