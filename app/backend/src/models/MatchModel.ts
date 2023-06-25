import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchModel {
  private sequelizeMatch = SequelizeMatch;

  async findAll(isInProgress: boolean | undefined): Promise<SequelizeMatch[]> {
    if (isInProgress !== undefined) {
      const matches = await this.sequelizeMatch.findAll({ include:
        [{ model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress: isInProgress } });
      return matches;
    }

    const matches = await this.sequelizeMatch.findAll({ include:
         [{ model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
           { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } }] });
    return matches;
  }

  async finishById(id: number) {
    return this.sequelizeMatch.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    return this.sequelizeMatch.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async create(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch>> {
    const homeTeam = await SequelizeTeam.findOne({ where: { id: homeTeamId } });
    const awayTeam = await SequelizeTeam.findOne({ where: { id: awayTeamId } });

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const sequelizeResponse = await this.sequelizeMatch.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return { status: 'CREATED', data: sequelizeResponse.dataValues };
  }

  async findHomeMatchesDoneByTeamId(teamId: number) {
    return this.sequelizeMatch.findAll(
      { where: { homeTeamId: teamId, inProgress: false } },
    );
  }
}
