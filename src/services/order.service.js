// order.service.js

import OrderDao from '../dao/order.dao.js';
// import BusinessService from '../services/business.service.js';
import UserService from '../services/user.service.js';
import CartService from '../services/cart.service.js';

export default class OrderService {
  static async getAllOrders() {
    try {
      const orders = await OrderDao.getAllOrders();
      return orders;
    } catch (error) {
      console.error('Error en el servicio al obtener todas las órdenes:', error);
      throw new Exception('Error en el servicio al obtener todas las órdenes', 500);
    }
  }

  static async getOrderById(orderId) {
    try {
      const order = await OrderDao.getOrderById(orderId);
      return order;
    } catch (error) {
      console.error('Error en el servicio al obtener la orden por ID:', error);
      throw new Exception('Error en el servicio al obtener la orden por ID', 500);
    }
  }

  static async createOrder(data) {
    try {
      const { user: userId, business: businessId, products } = data;

      const business = await BusinessService.getBusinessById(businessId);
      const user = await UserService.getUserById(userId);

      const productsResult = business.products.filter(p => products.some(product => product.productId.equals(p.id)));

      const newOrder = {
        user: userId,
        business: businessId,
        products: productsResult.map(product => ({
          productId: product.id,
          quantity: products.find(p => p.productId.equals(product.id)).quantity,
        })),
      };

      newOrder.total = productsResult.reduce((total, product) => total + (product.price * products.find(p => p.productId.equals(product.id)).quantity), 0);

      const order = await OrderDao.createOrder(newOrder);

      // Limpiar el carrito después de crear la orden
      await CartService.clearCart(user.cart);

      return order;
    } catch (error) {
      console.error('Error en el servicio al crear la orden:', error);
      throw new Exception('Error en el servicio al crear la orden', 500);
    }
  }

  // ... (otros métodos según sea necesario)
}
