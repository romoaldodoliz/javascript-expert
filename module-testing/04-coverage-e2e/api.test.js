const { deepStrictEqual, ok } = require('assert');
const { describe, it } = require('mocha');
const supertest = require('supertest');
const app = require('./api');

describe('API Suite Test', () => {
  describe('/contact', () => {
    it('should rquest the page and return HTTP status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200);
      deepStrictEqual(response.text, 'Contact us page');
    });
  });

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await supertest(app).get('/hi').expect(200);
      deepStrictEqual(response.text, 'Hello World!');
    });
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'WilliamKoller', password: '1223' })
        .expect(200);

      deepStrictEqual(response.text, 'Logging has succeeded!');
    });

    it('should unauthorized a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'XuxaDaSilva', password: '321' })
        .expect(401);
      ok(response.unauthorized);
      deepStrictEqual(response.text, 'Logging failed!');
    });
  });
});
