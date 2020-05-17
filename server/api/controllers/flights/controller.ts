import FlightsService from '../../services/flights.service';
import { Request, Response } from 'express';

export class Controller {
  getFlights(req: Request, res: Response): void {
    FlightsService.getAllFlights().then((r) => res.json(r));
  }
}
export default new Controller();
