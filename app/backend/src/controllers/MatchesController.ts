import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchesContoller {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAll(_req: Request, res: Response) {
    const { inProgress } = _req.query as { inProgress: string };

    let serviceResponse:ServiceResponse<SequelizeMatch[]>;

    if (inProgress) {
      const isInProgress = /true/i.test(inProgress);

      serviceResponse = await this.matchesService.findAll(isInProgress);

      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    serviceResponse = await this.matchesService.findAll(undefined);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.finishById(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this.matchesService
      .updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async create(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this.matchesService
      .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
