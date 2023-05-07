import users from '../data/data.json' assert { type: 'json' };
import { isUuidCorrect, parseUrl, validate } from '../utils/helper.js';
import userSchema from '../schema/schema.js';
import fileRecorder from '../utils/fileRecorder.js';
import parser from '../utils/parser.js';
import { IUser } from '../utils/types.js';

const putRequest = async (req, res) => {
  const { baseUrl, id } = parseUrl(req.url);

  if (baseUrl === '/api/users') {
    if (isUuidCorrect(id)) {
      const userLooking = users.find((user) => user.id === id);

      if (userLooking) {
        const newUser = (await parser(req)) as IUser;
        const errors = validate(newUser, userSchema);

        if (!errors.length) {
          const user = Object.assign(newUser, { id: userLooking.id });
          const usersWithoutUpdated = users.filter((el) => el.id !== id);
          fileRecorder([...usersWithoutUpdated, user]);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.write(JSON.stringify({ message: `user ${user.username} was successfully updated` }));
          res.end();
        } else {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `${errors.join(' ')}` }));
        }
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: 'no user with this id' }));
        res.end();
      }
    } else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: "uuid isn't correct" }));
      res.end();
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

export default putRequest;
