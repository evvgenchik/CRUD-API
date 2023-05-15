# Simple CRUD API

TypeScript, Node.js.

## 💾 How to install

Clone and install repository and then take develop

```
git clone https://github.com/evvgenchik/CRUD-API.git

cd CRUD-API

git checkout develop

```

npm install

```

Change name of file  example.env to .env;
This file contain default port number

```

PORT=4000

```

## 🚀 How to run

Run the application in development mode

```

npm run start:dev

```

Run the application in production mode

```

npm run start:prod

```

Run tests scenarios for API

```

npm run test

```

Run cluster mode with default load balancer and one in-memory-database for all workers

```

npm run start:multi

```

In response you can watch which worker who response in this time on the request.

## 🔌 API

Implemented endpoint: `api/users`

`GET api/users` - to get all users

- Server should answer with status code 200 and array of all users records

`GET api/users/${userId}` - to get user by id (uuid)

- Server should answer with status code 200 and and record with id === userId if it exists
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

`POST api/users` - to create record about new user and store it in database

- Server should answer with status code 201 and newly created record
- Server should answer with status code 400 and corresponding message if request body does not contain required fields

`PUT api/users/${userId}` - to update existing user (**all fields required**)

- Server should answer with status code 200 and updated record
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

`DELETE api/users/${userId}` - to delete existing user from database

- Server should answer with status code 204 if the record is found and deleted
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

### User's mandratory fields

- `username` — user's name (string, **required**)
- `age` — user's age (number, **required**)
- `hobbies` — user's hobbies (array of strings or empty array, **required**)
```
