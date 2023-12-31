import UserDao from '../dao/user.dao.js';
import { NotFoundException } from '../utils.js';

export default class UserService {
  static getAll = () => {
   return UserDao.getAll();
  };

  static create = (data) => {
    return UserDao.create(data);
  };

  static getById = async (uid) => {
    const user = await UserDao.getById(uid);
    if (!user) {
      throw new NotFoundException('Not found');
    }
    return user;
  };

  static getByEmail = async (email) => {
    const user = await UserDao.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found by email');
    }
    return user;
  };

  static updateById = (uid, data) => {
    return UserDao.updateById(uid, data);
  };
}
