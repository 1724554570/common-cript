import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
// 工具
import { createGuid, getTimeStamp } from '../../utils/utils';
import { Logger } from '../../utils/log4js';
import { QueryParams } from '../../global/query';
// 业务逻辑
import { Users } from '../interfaces/users.interface';

@Injectable()
export class UsersService {

  constructor(@Inject('USERS_MODEL') private readonly userModel: Model<Users>) { }

  /**
   * 增加用户
   * @param users
   */
  async create(users: Users): Promise<Users> {
    const time = getTimeStamp();
    const mf = Math.floor(time / 1000);
    if (!users.uuid) {
      users.uuid = createGuid();
      users.atime = mf;
      users.utime = mf;
      users.created = time;
      users.updated = time;
    }
    const createUsers = new this.userModel(users);
    return await createUsers.save();
  }

  /**
   * 以UUID查询 用户信息
   * @param id
   */
  async findByid(id: string): Promise<Users> {
    return await this.userModel.findOne({ uuid: id }).exec();
  }

  /**
   * 以UUID更新 用户信息
   * @param id UUID
   * @param updateData 需要更新的数据
   */
  async updateById(id: string, updateData: any): Promise<Users> {
    const time = getTimeStamp();
    const mf = Math.floor(time / 1000);
    updateData.utime = mf;
    updateData.updated = time;
    return await this.userModel.updateOne({ uuid: id }, { $set: updateData }).exec();
  }

  async findByName(username: string): Promise<Users> {
    return await this.userModel.findOne().or([{ username }, { phone: username }]).exec();
  }

  /**
   * 查询所有用户(分页类型)
   */
  async findAll(q: QueryParams = { page: 1, pageSize: 10 }): Promise<Users[]> {
    const skipSize = (q.page - 1) * q.pageSize;
    return await this.userModel.find().sort({ atime: 'asc' }).skip(skipSize).limit(q.pageSize).exec();
  }

}
