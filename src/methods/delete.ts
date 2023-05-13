import errorsMsg from '../utils/errorsMsg.js';
import { isUuidCorrect, parseUrl } from '../utils/helper.js';

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

export default deleteRequest;
