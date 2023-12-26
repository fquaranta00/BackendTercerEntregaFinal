import ProductModel from '../models/product.model.js';

export default class ProductDAO {
  static get(criteria = {}) {
    return ProductModel.find(criteria);
  }
  static async getById(pid) {
    return ProductModel.findById(pid);
  }
  static async create(data) {
    return ProductModel.create(data);
  }
  static async updateById(pid, data) {
    return ProductModel.findByIdAndUpdate(pid, { $set: data }, { new: true });
  }
  static async deleteById(pid) {
    return ProductModel.findByIdAndDelete(pid);
  }
  static async paginate(matchCriteria, options) {
    try {
      const products = await ProductModel.paginate(matchCriteria, options);
      return products;
    } catch (error) {
      console.error('Error al paginar productos:', error);
      throw new Error('Error al paginar productos');
    }
  }
}
