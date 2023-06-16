import { DataTypes, Model, InferAttributes,
  InferCreationAttributes, CreationOptional,
} from 'sequelize';

import SequelizeTeam from './SequelizeTeam';

import db from '.';

class SequelizeMatch extends Model<InferAttributes<SequelizeMatch>,
InferCreationAttributes<SequelizeMatch>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatch.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'id', as: 'homeTeam' });
SequelizeMatch.belongsTo(SequelizeTeam, { foreignKey: 'id', as: 'awayTeam' });
SequelizeTeam.hasMany(SequelizeMatch, { foreignKey: 'homeTeamId', as: 'homeTeam' });

export default SequelizeMatch;

// import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
// import db from './index';
// import { IMatch } from '../../Interfaces/Match';

// type MatchInputtableTypes = Optional<IMatch, 'id'>;
// type MatchSequelizeModelCreator = ModelDefined<IMatch, MatchInputtableTypes>;
// export type MatchSequelizeModel = Model<IMatch, MatchInputtableTypes>;

// const MatchModel: MatchSequelizeModelCreator = db.define('Match', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     unique: true,
//   },
//   homeTeamId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'teams',
//       key: 'id',
//     },
//   },
//   homeTeamGoals: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   awayTeamId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'teams',
//       key: 'id',
//     },
//   },
//   awayTeamGoals: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   inProgress: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//   },
// }, {
//   tableName: 'matches',
//   timestamps: false,
//   underscored: true,
// });

// export default MatchModel;
