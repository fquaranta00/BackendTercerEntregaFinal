
// cart.dao.js
import Cart from '../models/cart.model.js';
import { Exception } from '../utils.js';
import { v4 as uuidv4 } from 'uuid';

export default class CartDao {
  static async getAllCarts() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      console.error('Error al obtener todos los carritos:', error);
      throw new Exception('Error al obtener todos los carritos', 500);
    }
  }

  static async getCartById(cartId) {
    try {
      const cart = await Cart.findOne({ _id: cartId }).populate('products.productId').populate('products.productDetails');
      return cart;
    } catch (error) {
      console.error('Error al obtener el carrito por ID:', error);
      throw new Exception('Error al obtener el carrito por ID', 500);
    }
  }

  static getNewId() {
    return uuidv4();
  }

  static async createCart() {
    try {
      const newCart = await Cart.create({ products: [] });
      return newCart;
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      throw new Exception('Error al crear el carrito', 500);
    }
  }
}
