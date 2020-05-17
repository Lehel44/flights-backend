import L from '../../common/logger';

const axios = require('axios').default;

interface Flight {
  flight_date: string;
  departure_airport: string;
  arrival_airport: string;
}

export class FlightsService {
  getAllFlights(): Promise<any> {
    L.info(`fetch all flights from Heathrow`);

    const baseUrl = 'http://api.aviationstack.com/v1/flights?access_key=defb4fff0276b330183075b04d6bc6d4';
    const requestHeathrowArrivals = axios.get(baseUrl + '&arr_iata=LHR');
    const requestLutonArrivals = axios.get(baseUrl + '&arr_iata=LTN');
    const requestLutonDepartures = axios.get(baseUrl + '&dep_iata=LTN');

    return axios
      .all([
        requestHeathrowArrivals,
        requestLutonArrivals,
        requestLutonDepartures,
      ])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0].data.data;
          const responseTwo = responses[1].data.data;
          const responseThree = responses[2].data.data;
          return responseOne.concat(responseTwo).concat(responseThree);
        })
      )
      .catch((errors) => {
        L.error(errors);
      });
  }
}

export default new FlightsService();
