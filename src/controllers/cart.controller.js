import CartService from '../services/cart.service.js';
import OrderService from '../services/order.service.js';


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

    // try {
    //   const { cartId } = req.params;
    //   const cart = await CartService.getCartById(cartId);
    //   res.status(200).json(cart);
    // } catch (error) {
    //   res.status(error.statusCode || 500).json({ message: error.message });
    // }

    try {
      const { cartId } = req.params;
      const cart = await CartService.getCartById(cartId);

      if (!cart) {
        console.log(`El carrito con ID ${cartId} no fue encontrado.`);
        return res.status(404).render('error', { message: 'Carrito no encontrado' });
      }

      res.render('cart', { cart: cart.toJSON() });
    } catch (error) {
      res.status(error.statusCode || 500).render('error', { message: error.message });
    }

  }

  static async createCart(req, res) {
    try {
      const newCart = await CartService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async addProductToCart(req, res) {
    try {
      const { cartId } = req.params;
      const { productId, quantity } = req.body;

      const updatedCart = await CartService.addProductToCart(cartId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async removeProductFromCart(req, res) {
    try {
      const { cartId, productId } = req.params;

      const updatedCart = await CartService.removeProductFromCart(cartId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async updateProductQuantityInCart(req, res) {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;

      const updatedCart = await CartService.updateProductQuantityInCart(cartId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async checkoutCart(req, res) {
    try {
      const { user } = req.session; // Obtener el usuario de la sesión
      const cartId = req.session.cartId;

      // Obtener productos del carrito
      const cart = await CartService.getCartById(cartId);
      const productsInCart = cart.products;

      // Crear una nueva orden con los productos del carrito
      const newOrder = {
        user,
        products: productsInCart.map(product => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      };

      // Calcular el total de la orden (puedes ajustar esto según tu lógica)
      newOrder.total = productsInCart.reduce((total, product) => {
        // Puedes obtener el precio del producto desde la base de datos o donde lo tengas almacenado
        // Por ahora, asumimos que el precio está en el objeto del producto
        return total + (product.price * product.quantity);
      }, 0);

      // Crear la orden
      const order = await OrderService.create(newOrder);

      // Asociar la orden al carrito
      await CartService.updateOrder(cartId, order._id);

      // Limpiar el carrito
      await CartService.clearCart(cartId);

      res.status(200).json(order);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }


}
