import { isUuidCorrect, parseUrl } from '../utils/helper.js';
import fileRecorder from '../utils/fileRecorder.js';

const deleteRequest = (req, res, users) => {
  const { baseUrl, id } = parseUrl(req.url);

  if (baseUrl === '/api/users') {
    if (isUuidCorrect(id)) {
      const userLookingIndx = users.findIndex((user) => user.id === id);

      if (userLookingIndx !== -1) {
        users.splice(userLookingIndx, 1);

        res.statusCode = 204;
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
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
};

export default deleteRequest;
