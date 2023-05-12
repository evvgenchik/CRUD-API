import request from 'supertest';
import { server } from '../../src/server';

const newUser = {
  username: 'User',
  age: 20,
  hobbies: ['code'],
};
const newUserUpdated = {
  username: 'UserUpdated',
  age: 20,
  hobbies: ['code'],
};

afterAll(() => {
  server.close();
});

describe('Correct crud operations', () => {
  it('should return status code 200 and empty array', async () => {
    await request(server).get('/api/users').expect(200, []);
  });

  let createdId: string;

  it('should return status code 200 and created user on post request', async () => {
    const response = await request(server).post('/api/users').send(newUser).expect(201);

    const createdUser = response.body;
    createdId = createdUser.user.id;

    expect(createdUser).toEqual({ user: { ...newUser, id: expect.any(String) } });
  });

  it('should return status code 200 and created user on get request', async () => {
    const response = await request(server).get(`/api/users/${createdId}`).expect(200);
    const user = response.body;

    expect(user).toEqual({ user: { ...newUser, id: createdId } });
  });

  it('should return status code 200 and updated user', async () => {
    const response = await request(server)
      .put(`/api/users/${createdId}`)
      .send(newUserUpdated)
      .expect(200);

    const updatedUser = response.body;

    expect(updatedUser).toEqual({ user: { ...newUserUpdated, id: createdId } });
  });

  it('should return status code 204 and delete user', async () => {
    await request(server).delete(`/api/users/${createdId}`).expect(204);
  });

  it("should return status code 404 and message that user doesn'n exists", async () => {
    await request(server)
      .get(`/api/users/${createdId}`)
      .expect(404, { message: 'no user with this id' });
  });
});

describe('Incorrect crud operations. Add incorrect user and try to interact with him', () => {
  it('should return status code 400 and message that body incorrect', async () => {
    await request(server).post('/api/users').send({ username: 'incorrect' }).expect(400, {
      message: 'field age is invalid. field hobbies is invalid.',
    });
  });

  it('should return status code 400 and message that id incorrect', async () => {
    await request(server).get(`/api/users/1234`).expect(400, { message: "uuid isn't correct" });
  });

  it("should return status code 400 and message that uuid isn't correct", async () => {
    await request(server)
      .put(`/api/users/123`)
      .send(newUserUpdated)
      .expect(400, { message: "uuid isn't correct" });
  });

  it("should return status code 400 and message that uuid isn't correct", async () => {
    await request(server).delete(`/api/users/1234`).expect(400, { message: "uuid isn't correct" });
  });
});
