import ProductService from '../services/product.service.js';

export default class ProductController {
  static async create(data) {
    try {
      console.log('Creando el nuevo producto');
      const newProduct = await ProductService.create(data);
      console.log('Producto creado correctamente');
      return newProduct;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw new Error('Error al crear el producto');
    }
  }

  static async get(query = {}) {
    try {
      const products = await ProductService.findAll(query);
      return products;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('Error al obtener productos');
    }
  }

  static async getById(pid) {
    try {
      const product = await ProductService.getById(pid);
      return product;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      throw new Error('Error al obtener el producto por ID');
    }
  }

  static async updateById(pid, data) {
    try {
      await ProductController.getById(pid);
      console.log('Actualizando el producto');
      const updatedProduct = await ProductService.updateById(pid, data);
      console.log('Producto actualizado correctamente');
      return updatedProduct;
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new Error('Error al actualizar el producto');
    }
  }

  static async deleteById(pid) {
    try {
      await ProductController.getById(pid);
      console.log('Eliminando el producto');
      const deletedProduct = await ProductService.deleteById(pid);
      console.log('Producto eliminado correctamente');
      return deletedProduct;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new Error('Error al eliminar el producto');
    }
  }

  static async paginate(matchCriteria, options) {
    try {
      const products = await ProductService.paginate(matchCriteria, options);
      return products;
    } catch (error) {
      console.error('Error al paginar productos:', error);
      throw new Error('Error al paginar productos');
    }
  }
}
