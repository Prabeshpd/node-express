import { expect } from 'chai';
import request from 'supertest';

import app, { server } from '../../src/server';
import { getTestDatabaseConnection } from '../../src/utils/testConnection';

describe('User login test', () => {
  let connection: any;
  before(async () => {
    connection = getTestDatabaseConnection();
  });

  it('should return token with correct credentials', (done) => {
    request(app)
      .post('/api/v1/users')
      .send({ email: 'random_jude@gmail.com', password: 'random@123', name: 'random jude' })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.name).to.be.equal('random jude');
        expect(res.body).to.not.haveOwnProperty('password');
        expect(res.body.email).to.be.equal('random_jude@gmail.com');
        done();
      });
  });

  after(async () => {
    await connection.delete().from('users');

    server.close();
  });
});