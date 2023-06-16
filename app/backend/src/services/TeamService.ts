import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: ITeam['id']): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
