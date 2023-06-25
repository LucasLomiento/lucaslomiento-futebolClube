import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeMatch from '../database/models/SequelizeMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {}

  async getTeamsLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const resultPromises = allTeams.map(async (team) => {
      const matches = await this.matchModel.findHomeMatchesDoneByTeamId(team.id);
      return {
        name: team.teamName,
        ...LeaderboardService.formatter(matches, team.id),
      };
    });
    const result = await Promise.all(resultPromises);
    result.sort(LeaderboardService.sortMethod);
    return { status: 'SUCCESSFUL', data: result };
  }

  private static formatter(matches: SequelizeMatch[], teamId: number) {
    const { wins, points, draws, losses } = LeaderboardService
      .getMatchesResults(matches, teamId);
    const { goalsFavor, goalsOwn } = LeaderboardService.getGoals(matches);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = LeaderboardService.getEfficiency(points, matches.length);
    return {
      totalPoints: points,
      totalGames: matches.length,
      totalVictories: wins,
      totalDraws: draws,
      totalLosses: losses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  private static getMatchesResults(matches: SequelizeMatch[], teamId: number) {
    const results = matches.map((match) => LeaderboardService.winsCheckerBoth(match, teamId));
    const wins = results.filter((result) => result === 'won').length;
    const draws = results.filter((result) => result === 'draw').length;
    const losses = results.filter((result) => result === 'lost').length;
    return { wins, points: wins * 3 + draws, draws, losses };
  }

  private static winsCheckerBoth(match: SequelizeMatch, teamId: number) {
    if (match.homeTeamId === teamId) {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return 'won';
      }
      if (match.awayTeamGoals > match.homeTeamGoals) {
        return 'lost';
      }
      return 'draw';
    }
    if (match.awayTeamGoals > match.homeTeamGoals) {
      return 'won';
    }
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return 'lost';
    }
    return 'draw';
  }

  private static getGoals(matches: SequelizeMatch[]) {
    const goalsFavor = matches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return { goalsFavor, goalsOwn };
  }

  private static getEfficiency(points: number, games: number): number {
    return +((points / (games * 3)) * 100).toFixed(2);
  }

  private static sortMethod(a: ILeaderboard, b: ILeaderboard) {
    if (a.totalPoints === b.totalPoints) {
      if (a.totalVictories === b.totalVictories) {
        if (a.goalsBalance === b.goalsBalance) {
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalVictories - a.totalVictories;
    }
    return b.totalPoints - a.totalPoints;
  }
}
