import { IncomingMessage, ServerResponse } from 'http';
import { UsersDB } from '../utils/types.js';
import errorsMsg from '../utils/errorsMsg.js';
import { parseUrl, isUuidCorrect } from '../utils/helper.js';

const getRequest = async (req: IncomingMessage, res: ServerResponse, users: UsersDB) => {
  const { baseUrl, id } = parseUrl(req);

  if (req.url === '/api/users') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } else if (id && baseUrl === '/api/users') {
    if (isUuidCorrect(id)) {
      const userLooking = users.find((user) => user.id === id);

      if (userLooking) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ user: userLooking }));
        res.end();
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: errorsMsg.user }));
        res.end();
      }
    } else {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: errorsMsg.id }));
      res.end();
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: errorsMsg.path }));
  }
};

export default getRequest;
