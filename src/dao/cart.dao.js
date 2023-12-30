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

  static async addProductToCart(cartId, productId, quantity) {
    try {
      // Implementa la lógica para agregar un producto al carrito
      const cart = await Cart.findOne({ _id: cartId });
      const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
      
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error('Error al agregar un producto al carrito:', error);
      throw new Exception('Error al agregar un producto al carrito', 500);
    }
  }

  static async removeProductFromCart(cartId, productId) {
    try {
      // Implementa la lógica para eliminar un producto del carrito
      const cart = await Cart.findOne({ _id: cartId });
      cart.products = cart.products.filter(item => item.productId.toString() !== productId);
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error('Error al eliminar un producto del carrito:', error);
      throw new Exception('Error al eliminar un producto del carrito', 500);
    }
  }

  static async updateProductQuantityInCart(cartId, productId, quantity) {
    try {
      // Implementa la lógica para actualizar la cantidad de un producto en el carrito
      const cart = await Cart.findOne({ _id: cartId });
      const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = quantity;
      }

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error('Error al actualizar la cantidad de un producto en el carrito:', error);
      throw new Exception('Error al actualizar la cantidad de un producto en el carrito', 500);
    }
  }
}
