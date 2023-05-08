import { isUuidCorrect, parseUrl, validate } from '../utils/helper.js';
import userSchema from '../schema/schema.js';
import parser from '../utils/parser.js';
import { IUser } from '../utils/types.js';

const putRequest = async (req, res, users) => {
  const { baseUrl, id } = parseUrl(req.url);

  if (baseUrl === '/api/users') {
    if (isUuidCorrect(id)) {
      const userLookingIndx = users.findIndex((user) => user.id === id);

      if (userLookingIndx !== -1) {
        const newUser = (await parser(req)) as IUser;
        const errors = validate(newUser, userSchema);

        if (!errors.length) {
          const deletedUser = users.splice(userLookingIndx, 1)[0];
          console.log(deletedUser);

          const user = Object.assign(newUser, { id: deletedUser.id });
          console.log(user);

          users.push(user);

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
