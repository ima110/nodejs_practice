const app = require("../01-requestcount");
const request = require('supertest');

describe('GET /user', function () {
  it('One request responds with 1', function (done) {
    request(app)
      .get('/requestCount')
      .then(response => {
        expect(response.body.requestCount).toBe(1);
        done();
      });
  });

  it('10 more requests log 12', function (done) {
    // Create an array of 10 GET /user requests
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(request(app).get('/user'));
    }

    // Wait for all 10 requests to complete
    Promise.all(promises)
      .then(() => {
        return request(app).get('/requestCount');
      })
      .then(response => {
        expect(response.body.requestCount).toBe(12);
        done();
      })
      .catch(err => done(err));
  });
});


