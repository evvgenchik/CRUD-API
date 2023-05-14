const parser = (req) => {
  return new Promise((res, rej) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('error', (err) => {
      rej(err);
    });
    req.on('end', () => {
      console.log('data ' + data);
      console.log('dataParsed ' + JSON.parse(data));

      res(JSON.parse(data));
    });
  });
};

export default parser;
