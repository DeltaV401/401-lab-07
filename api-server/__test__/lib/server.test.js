'use strict';


const { server } = require('../../lib/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {
  it('should return 404 for missing path', () => {
    return mockRequest
      .get('/404')
      .expect(404);
  });

  it('should return 500 for unhandled error', () => {
    return mockRequest
      .get('/500')
      .expect(500);
  });

  it('should return 200 for home page', () => {
    return mockRequest
      .get('/')
      .expect(200)
      .expect('We\'re here! We\'re here everybody! We are here. We are here. We are here.');
  });
  
  it('should respond properly on request to /categories', () => {
    return mockRequest
      .get('/categories/')
      .expect(200)
      .then(results => {
        expect(results.body.count).toBe(0);
      });
  });

  it('should respond properly on post to /categories', () => {
    return mockRequest
      .post('/categories')
      .send({name:'Test', description:'test stuff'})
      .expect(200)
      .then(results => {
        expect(results.body.name).toBe('Test');
      });
  });
});
