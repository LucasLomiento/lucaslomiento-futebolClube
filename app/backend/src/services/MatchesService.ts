import MatchesModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
  ) {}

  public async findAll(isInProgress: IMatch['inProgress'] | undefined)
    : Promise<ServiceResponse<SequelizeMatch[]>> {
    const allMatchess = await this.matchesModel.findAll(isInProgress);
    return { status: 'SUCCESSFUL', data: allMatchess };
  }

  public async finishById(id: IMatch['id']): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.finishById(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: IMatch['id'],
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async create(
    homeTeamId: IMatch['homeTeamId'],
    awayTeamId: IMatch['awayTeamId'],
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ) {
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const modelResponse = await this.matchesModel
      .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return {
      status: modelResponse.status,
      data: modelResponse.data,
    };
  }
}
