import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
