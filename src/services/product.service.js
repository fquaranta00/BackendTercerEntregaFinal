import ProductDAO from '../dao/product.dao.js';
import { Exception } from '../utils.js';

export default class ProductService {
  static findAll(filter = {}) {
    return ProductDAO.get(filter);
  }

  static async getById(pid) {
    const product = await ProductDAO.getById(pid);
    if (!product) {
      throw new Exception('Producto no encontrado', 404);
    }
    return product;
  }

  static async create(payload) {
    const product = await ProductDAO.create(payload);
    console.log('Producto creado correctamente');
    return product;
  }

  static async updateById(pid, payload) {
    const product = await ProductDAO.updateById(pid, payload);
    if (!product) {
      throw new Exception('Producto no encontrado', 404);
    }
    console.log('Producto actualizado correctamente');
    return product;
  }

  static async deleteById(pid) {
    const product = await ProductDAO.deleteById(pid);
    if (!product) {
      throw new Exception('Producto no encontrado', 404);
    }
    console.log('Producto eliminado correctamente');
    return product;
  }

  static async paginate(matchCriteria, options) {
    return ProductDAO.paginate(matchCriteria, options);
  }
}
