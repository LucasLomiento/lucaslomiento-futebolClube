export interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesResponse extends IMatch {
  homeTeam: {
    name: string,
  },
  awayTeam: {
    name: string,
  },
}
