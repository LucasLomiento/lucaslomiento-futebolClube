import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';

import { matchesMock, inProgressMatchesMock, notInProgressMatchesMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('GET /matches', () => {
    it('should return an array of matches', async () => {
      const teamsInstance = SequelizeMatch.bulkBuild(matchesMock)
      sinon.stub(SequelizeMatch, 'findAll').resolves(teamsInstance)

      const res = await chai.request(app).get('/matches');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(matchesMock);
    });

    it('should return array of matches in progress if filter inProgress true', async () => {
      const teamsInstance = SequelizeMatch.bulkBuild(inProgressMatchesMock)
      sinon.stub(SequelizeMatch, 'findAll').resolves(teamsInstance)

      const res = await chai.request(app).get('/matches?inProgress=true');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(inProgressMatchesMock);
    });

    it('should return array of matches not in progress if filter inProgress false', async () => {
      const teamsInstance = SequelizeMatch.bulkBuild(notInProgressMatchesMock)
      sinon.stub(SequelizeMatch, 'findAll').resolves(teamsInstance)

      const res = await chai.request(app).get('/matches?inProgress=false');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(notInProgressMatchesMock);
    });
  });
});