// const bdRequest = async () => {
//   let DB: any[] = [];
//   return new Promise((resolve, reject) => {
//     http
//       .get('http://localhost:4999', (res) => {
//         res.setEncoding('utf8');

//         res.on('data', (chunk) => {
//           DB.push(chunk);

//         res.on('end', () => {
//           resolve(DB);
//         });
//       })
//       .on('error', (err) => {
//         console.log('Error: ', err.message);
//       });
//   });

// const dbServer = http
//   .createServer((req, res) => {
//     const DB: usersDB = [
//       {
//         username: 'User',
//         age: 20,
//         hobbies: ['code'],
//         id: 'asd',
//       },
//     ];

//     if (req.method === 'GET') {
//       res.statusCode = 200;
//       res.write(JSON.stringify(DB));
//       res.end();
//     }
//   })
//   .listen(4999, () => {
//     console.log(`DB SERVER START ON 4999`);
//   });
