import request from 'supertest';
import app from '../../src/server';
import utils from '../../src/server/utils-server';

describe('The Express server', () => {
  it('sends index.html for nonexistent routes', done => {
    request(app)
      .get('/a-nonexistent-route')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .end(err => {
        if (err) {
          throw err;
        } else {
          done();
        }
      });
  });

  it('handles errors', done => {
    jest.spyOn(utils, 'readFile').mockImplementationOnce(() => {
      throw new Error('Cannot read file');
    });

    jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    request(app)
      .get('/api/characters')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(500)
      .expect(res =>
        expect(res.body).toEqual(
          expect.objectContaining({
            source: 'local',
            request: null,
            severity: 'unknown',
            message: 'Cannot read file'
          })
        )
      )
      .end((err, res) => {
        if (err) {
          throw err;
        } else {
          done();
        }
      });
  });
});
