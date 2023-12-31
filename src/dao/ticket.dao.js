import Ticket from '../models/ticket.model.js';
import { Exception } from '../utils.js';

export default class TicketDao {
  static async getAllTickets() {
    try {
      const tickets = await Ticket.find();
      return tickets;
    } catch (error) {
      console.error('Error al obtener todas las órdenes:', error);
      throw new Exception('Error al obtener todas las órdenes', 500);
    }
  }

  static async getTicketById(ticketId) {
    try {
      const ticket = await Ticket.findById(ticketId);
      return ticket;
    } catch (error) {
      console.error('Error al obtener la orden por ID:', error);
      throw new Exception('Error al obtener la orden por ID', 500);
    }
  }

  static async createTicket(data) {
    try {
      const newTicket = await Ticket.create(data);
      return newTicket;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      throw new Exception('Error al crear la orden', 500);
    }
  }

}
