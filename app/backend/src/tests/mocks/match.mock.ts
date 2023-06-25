export const matchesMock = [{
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
  },
];

export const inProgressMatchesMock = [{
  id: 2,
  homeTeamId: 9,
  homeTeamGoals: 1,
  awayTeamId: 14,
  awayTeamGoals: 1,
  inProgress: true,
}];

export const notInProgressMatchesMock = [{
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
},{
  id: 3,
  homeTeamId: 4,
  homeTeamGoals: 3,
  awayTeamId: 11,
  awayTeamGoals: 0,
  inProgress: false,
}];
