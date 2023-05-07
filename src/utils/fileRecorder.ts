import fsPromise from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileRecorder = (users) => {
  const src = path.resolve(__dirname, '../data/data.json');
  const usersJson = JSON.stringify(users);

  fsPromise.writeFile(src, usersJson);
};

export default fileRecorder;
