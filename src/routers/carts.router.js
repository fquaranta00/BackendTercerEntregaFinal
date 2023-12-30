// // cartsRouter.js

// import { Router } from 'express';
// import CartManager from '../dao/cart.dao.js';

// const router = Router();

// router.get('/:cartId', async (req, res) => {
//   try {
//     const { cartId } = req.params;
//     const cart = await CartManager.getCartById(cartId);
    
//     if (!cart) {
//       console.log(`El carrito con ID ${cartId} no fue encontrado.`);
//       return res.status(404).render('error', { message: 'Carrito no encontrado' });
//     }

//     res.render('cart', { cart: cart.toJSON() });

//   } catch (error) {
//     res.status(error.statusCode || 500).json({ message: error.message });
//   }
// });

// export default router;

//SEGUNDO COMETARIO!!!
import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const router = Router();

router.get('/', CartController.getAllCarts);
router.get('/:cartId', CartController.getCartById);
router.post('/', CartController.createCart);
router.post('/:cartId/products', CartController.addProductToCart);
router.delete('/:cartId/products/:productId', CartController.removeProductFromCart);
router.patch('/:cartId/products/:productId', CartController.updateProductQuantityInCart);

export default router;
