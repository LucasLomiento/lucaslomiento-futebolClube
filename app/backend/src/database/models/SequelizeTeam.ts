import { DataTypes, Model, InferAttributes,
  InferCreationAttributes, CreationOptional,
} from 'sequelize';

import db from '.';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default SequelizeTeam;

// import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
// import db from './index';
// import { ITeam } from '../../Interfaces/Team';

// type TeamInputtableTypes = Optional<ITeam, 'id'>;
// type TeamSequelizeModelCreator = ModelDefined<ITeam, TeamInputtableTypes>;
// export type TeamSequelizeModel = Model<ITeam, TeamInputtableTypes>;

// const TeamModel: TeamSequelizeModelCreator = db.define('Team', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
//   },
//   teamName: {
//     allowNull: false,
//     type: DataTypes.STRING,
//   },
// }, {
//   tableName: 'teams',
//   timestamps: false,
//   underscored: true,
// });

// export default TeamModel;
