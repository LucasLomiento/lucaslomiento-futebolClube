import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';

import { userMock, correctLoginBody, tokenMock, incorrectLoginBody } from './mocks/Login.mock';
import HandleToken from '../auth/HandleToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  beforeEach(() => {
    sinon.restore();

  })
  describe('POST /login', () => {
    it('deveria retornar o token', async () => {
      const userInstance = SequelizeUser.build(userMock)
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance)

      const response = await chai.request(app).post('/login').send(correctLoginBody);

      expect(response.status).to.be.eq(200);

      expect(response.body).to.have.property('token');
    });
  });

  describe('WRONG POST /login', () => {
    it('Unauthorized se senha errado', async () => {
      const userInstance = SequelizeUser.build(userMock)
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance)

      const response = await chai.request(app).post('/login').send({ ...correctLoginBody, password: 'wrongPassword' });

      expect(response.status).to.be.eq(401);

      expect(response.body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('Unauthorized se email errado', async () => {
      const userInstance = SequelizeUser.build(userMock)
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance)

      const response = await chai.request(app).post('/login').send({ ...correctLoginBody, email: 'wrongEmail' });

      expect(response.status).to.be.eq(401);

      expect(response.body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('INVALID_DATA se email não for enviado', async () => {
      const userInstance = SequelizeUser.build(userMock)
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance)

      const response = await chai.request(app).post('/login').send({ ...correctLoginBody, email: undefined });

      expect(response.status).to.be.eq(400);

      expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('INVALID_DATA se senha não for enviado', async () => {
      const userInstance = SequelizeUser.build(userMock)
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance)

      const response = await chai.request(app).post('/login').send({ ...correctLoginBody, password: undefined });

      expect(response.status).to.be.eq(400);

      expect(response.body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('UNAUTHORIZED se email for enviado errado', async () => {
      const userInstance = SequelizeUser.build(userMock)
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance)

      const response = await chai.request(app).post('/login').send({ ...correctLoginBody, email: 'wrongEmail' });

      expect(response.status).to.be.eq(401);

      expect(response.body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('UNAUTHORIZED se senha for enviado errado', async () => {
      const userInstance = SequelizeUser.build(userMock)
      sinon.stub(SequelizeUser, 'findOne').resolves(userInstance)

      const response = await chai.request(app).post('/login').send({ ...correctLoginBody, password: 'wrong' });

      expect(response.status).to.be.eq(401);

      expect(response.body).to.be.deep.eq({ message: 'Invalid email or password' });
    });

    it('UNAUTHORIZED se usuario nao existir', async () => {
      sinon.stub(SequelizeUser, 'findOne').resolves(null)

      const response = await chai.request(app).post('/login').send(incorrectLoginBody);
      expect(response.status).to.be.eq(401);

      expect(response.body).to.have.key('message');
    });
  });

  describe('GET /login/role', () => {
    it('deveria retornar a role', async () => {
      sinon.stub(HandleToken.prototype, 'verify').returns({ id: 1, role: 'admin', email: 'admin@admin.com' })

      const response = await chai.request(app).get('/login/role').set('Authorization', tokenMock);

      expect(response.status).to.be.eq(200);
      expect(response.body.role).to.be.eq('admin');
    });
  });

  describe('WRONG GET /login/role', () => {
    it('UNAUTHORIZED se não tiver token', async () => {
      const response = await chai.request(app).get('/login/role');

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.eq({ message: 'Token not found' });
    });

    it('UNAUTHORIZED se token for inexistente', async () => {
      const response = await chai.request(app).get('/login/role').set('Authorization', 'invalido');

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.key('message');
    });

    it('UNAUTHORIZED se token for inválido', async () => {
      const response = await chai.request(app).get('/login/role').set('Authorization', 'wrogtoken');

      expect(response.status).to.be.eq(401);
      expect(response.body).to.be.deep.eq({ message: 'Token must be a valid token' });
    });
  });
});
