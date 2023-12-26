// cart.service.js
import CartDao from '../dao/cart.dao.js';

export default class CartService {
  static async getAllCarts() {
    try {
      const carts = await CartDao.getAllCarts();
      return carts;
    } catch (error) {
      console.error('Error en el servicio al obtener todos los carritos:', error);
      throw new Exception('Error en el servicio al obtener todos los carritos', 500);
    }
  }

  static async getCartById(cartId) {
    try {
      const cart = await CartDao.getCartById(cartId);
      return cart;
    } catch (error) {
      console.error('Error en el servicio al obtener el carrito por ID:', error);
      throw new Exception('Error en el servicio al obtener el carrito por ID', 500);
    }
  }

  static getNewId() {
    return CartDao.getNewId();
  }

  static async createCart() {
    try {
      const newCart = await CartDao.createCart();
      return newCart;
    } catch (error) {
      console.error('Error en el servicio al crear el carrito:', error);
      throw new Exception('Error en el servicio al crear el carrito', 500);
    }
  }

}
