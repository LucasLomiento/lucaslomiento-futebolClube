import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { teamMock, teamsMock } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('GET /teams', () => { 
    it('deveria retornar os times', async () => {
      const teamsInstance = SequelizeTeam.bulkBuild(teamsMock)
      sinon.stub(SequelizeTeam, 'findAll').resolves(teamsInstance)

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(teamsMock);
    });
   });

  describe('GET /teams/:id', () => {
    it('deveria retornar o time', async () => {
      const teamInstance = SequelizeTeam.build(teamMock)
      sinon.stub(SequelizeTeam, 'findByPk').resolves(teamInstance)

      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(teamMock);
    });
  });

  describe('NotFound Get /teams/:id', () => {
    it('deveria retornar o time', async () => {
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null)

      const response = await chai.request(app).get('/teams/1');

      expect(response.status).to.be.eq(404);
      expect(response.body).to.be.deep.eq({ message: 'Team 1 not found' });
    });
  });
});
