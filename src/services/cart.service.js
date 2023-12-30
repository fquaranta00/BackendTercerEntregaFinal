import CartDao from '../dao/cart.dao.js';
import { Exception } from '../utils.js';

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

  static async addProductToCart(cartId, productId, quantity) {
    try {
      // Implementa la lógica para agregar un producto al carrito
      const updatedCart = await CartDao.addProductToCart(cartId, productId, quantity);
      return updatedCart;
    } catch (error) {
      console.error('Error en el servicio al agregar un producto al carrito:', error);
      throw new Exception('Error en el servicio al agregar un producto al carrito', 500);
    }
  }

  static async removeProductFromCart(cartId, productId) {
    try {
      // Implementa la lógica para eliminar un producto del carrito
      const updatedCart = await CartDao.removeProductFromCart(cartId, productId);
      return updatedCart;
    } catch (error) {
      console.error('Error en el servicio al eliminar un producto del carrito:', error);
      throw new Exception('Error en el servicio al eliminar un producto del carrito', 500);
    }
  }

  static async updateProductQuantityInCart(cartId, productId, quantity) {
    try {
      // Implementa la lógica para actualizar la cantidad de un producto en el carrito
      const updatedCart = await CartDao.updateProductQuantityInCart(cartId, productId, quantity);
      return updatedCart;
    } catch (error) {
      console.error('Error en el servicio al actualizar la cantidad de un producto en el carrito:', error);
      throw new Exception('Error en el servicio al actualizar la cantidad de un producto en el carrito', 500);
    }
  }
}
