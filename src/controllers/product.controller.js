import ProductService from '../services/product.service.js';

export default class ProductController {
  static async create(data) {
    console.log('Creando el nuevo producto');
    const newProduct = await ProductService.create(data);
    console.log('Producto creado correctamente');
    return newProduct;
  }

  static async get(query = {}) {
    const products = await ProductService.findAll(query);
    return products;
  }

  static async getById(pid) {
    const product = await ProductService.getById(pid);
    return product;
  }

  static async updateById(pid, data) {
    await ProductController.getById(pid);
    console.log('Actualizando el producto');
    const updatedProduct = await ProductService.updateById(pid, data);
    console.log('Producto actualizado correctamente');
    return updatedProduct;
  }

  static async deleteById(pid) {
    await ProductController.getById(pid);
    console.log('Eliminando el producto');
    const deletedProduct = await ProductService.deleteById(pid);
    console.log('Producto eliminado correctamente');
    return deletedProduct;
  }

  static async paginate(matchCriteria, options) {
    return ProductService.paginate(matchCriteria, options);
  }
}
