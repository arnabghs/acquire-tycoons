const request = require('supertest');

const app = require('../src/app.js');

describe('app', () => {
  it('should return send not found', done => {
    request(app)
      .get('/bad')
      .expect(404)
      .end(done);
  });
});
