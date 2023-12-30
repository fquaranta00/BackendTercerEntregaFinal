// order.dao.js

import Order from '../models/order.model.js';
import { Exception } from '../utils.js';

export default class OrderDao {
  static async getAllOrders() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      console.error('Error al obtener todas las órdenes:', error);
      throw new Exception('Error al obtener todas las órdenes', 500);
    }
  }

  static async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      return order;
    } catch (error) {
      console.error('Error al obtener la orden por ID:', error);
      throw new Exception('Error al obtener la orden por ID', 500);
    }
  }

  static async createOrder(data) {
    try {
      const newOrder = await Order.create(data);
      return newOrder;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      throw new Exception('Error al crear la orden', 500);
    }
  }

  // ... (otros métodos según sea necesario)
}
