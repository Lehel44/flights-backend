import express from 'express';
import controller from '../flights/controller';
export default express.Router().get('/', controller.getFlights);
