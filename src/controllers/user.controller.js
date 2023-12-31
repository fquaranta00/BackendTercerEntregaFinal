import UserService from '../services/user.service.js';

export default class UsersController {
  static getAll = async () => {
    return await UserService.getAll();
  };

  static create = async (data) => {
    return await UserService.create(data);
  };

  static getById = async (uid) => {
    return await UserService.getById(uid);
  };

  static updateById = async (uid, data) => {
    return await UserService.updateById(uid, data);
  };

  static getByEmail = async (email) => {
    return await UserService.getByEmail(email);
  };

}
