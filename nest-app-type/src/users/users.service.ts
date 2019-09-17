import { Injectable } from '@nestjs/common';
import { Users } from './interfaces/users.interface';
import { createGuid } from '../utils/utils';
import logger from '../utils/log4js';

@Injectable()
export class UsersService {
  private readonly users: Users[] = [];

  /**
   * 增加用户
   * @param users
   */
  create(users: Users) {
    if (!users.id) {
      const uid = createGuid();
      users.id = uid;
      logger.info(`UsersController create UserId=${uid}`);
    }
    this.users.push(users);
  }

  findAll(): Users[] {
    return this.users;
  }
}
