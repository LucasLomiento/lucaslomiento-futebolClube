import { IMatchesResponse, IMatch } from './IMatch';

export interface IMatchModel {
  findAll(isInProgress: IMatch['inProgress'] | undefined): Promise<IMatchesResponse>,
  finishById(id: IMatch['id']): void,
  updateMatch(id: IMatch['id'], homeTeamGoals: IMatch['homeTeamGoals']): void,
  create(
    homeTeamId: IMatch['homeTeamId'],
    awayTeamId: IMatch['awayTeamId'],
    homeTeamGoals: IMatch['homeTeamGoals'],
    awayTeamGoals: IMatch['awayTeamGoals'],
  ): string,
}
