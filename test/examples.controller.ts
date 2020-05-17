import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Flights', () => {
  it('should get all flights', () =>
    request(Server)
      .get('/api/v1/flights')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(300);
        expect(r.body[0]).to.be.an('object').that.has.property('flight_date');
        expect(r.body[0]).that.has.property('departure');
        expect(r.body[0]).that.has.property('arrival');
      }));
});
