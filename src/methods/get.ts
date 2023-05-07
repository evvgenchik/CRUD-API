import users from '../data/data.json' assert { type: 'json' };
import { parseUrl, isUuidCorrect } from '../utils/helper.js';

const getRequest = (req, res) => {
  const { baseUrl, id } = parseUrl(req.url);

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
        res.write(JSON.stringify(userLooking));
        res.end();
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
    res.end(JSON.stringify({ title: 'Not found', message: 'Route not found' }));
  }
};

export default getRequest;
