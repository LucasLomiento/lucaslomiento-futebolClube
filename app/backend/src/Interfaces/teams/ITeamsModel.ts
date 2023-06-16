import { ITeam } from './ITeam';

export interface ITeamsModel {
  findAll(): Promise<ITeam[]>;
  findById(id: ITeam['id']): Promise<ITeam | null>;
}
