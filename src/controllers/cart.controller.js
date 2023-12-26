// cart.controller.js
import CartService from '../services/cart.service.js';

export default class CartController {
  static async getAllCarts(req, res) {
    try {
      const carts = await CartService.getAllCarts();
      res.status(200).json(carts);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async getCartById(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await CartService.getCartById(cartId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static getNewId() {
    return CartService.getNewId();
  }

  static async createCart(req, res) {
    try {
      const newCart = await CartService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

}
