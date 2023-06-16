import { Model, QueryInterface, DataTypes } from 'sequelize';
import { ITeam } from '../../Interfaces/teams/ITeam';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITeam>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      teamName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'team_name',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};