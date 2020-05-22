import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
// 工具
import { createGuid, getTimeStamp, getFormatDate } from '../../utils/utils';
import { Logger } from '../../utils/log4js';
import { QueryParams } from '../../global/query';
// 业务逻辑
import { Funds } from '../interfaces/users.interface';

@Injectable()
export default class FundsService {

  constructor(@Inject('FUNDS_MODEL') private readonly useModel: Model<Funds>) { }

  /**
   * 增加用户
   * @param funds
   */
  async create(funds: Funds): Promise<Funds> {
    const time = getTimeStamp();
    const mf = Math.floor(time / 1000);
    funds.created = mf;
    funds.updated = mf;
    if (funds.usePrice) {
      let total = (funds.usePrice / funds.fundPrice).toString();
      let value = total.split('.');
      if (value[1]) {
        value[1] = value[1].substring(0, 2);
      }
      funds.useTotal = `${value[0]}.${value[1]}`;
      // funds.useTotal = (funds.usePrice / funds.fundPrice).toFixed(2);
    }
    const createUsers = new this.useModel(funds);
    return await createUsers.save();
  }

  /**
   * 以UUID更新 用户信息
   * @param id UUID
   * @param updateData 需要更新的数据
   */
  async updateById(id: string, updateData: any): Promise<Funds> {
    const time = getTimeStamp();
    const mf = Math.floor(time / 1000);
    updateData.utime = mf;
    updateData.updated = time;
    return await this.useModel.updateOne({ uuid: id }, { $set: updateData }).exec();
  }

  /**
   * 查询所有用户(分页类型)
   */
  async findAll(q: QueryParams = { page: 1, pageSize: 10 }): Promise<Funds[]> {
    const skipSize = (q.page - 1) * q.pageSize;
    const search = q.text ? { fundCode: q.text, unUse: 0 } : { unUse: 0 };
    return await this.useModel.find(search).sort({ atime: 'asc' }).skip(skipSize).limit(q.pageSize * 1).exec();
  }

  // 更基金值
  async updateAll(body: any) {
    let collection = await this.findAll({ page: 1, pageSize: 1000 });
    let length = collection && collection.length > 0;
    let res = [];
    if (length) {
      for (var i = 0; i < collection.length; i++) {
        let data = collection[i];
        let profitLoss = body.nowPrice - data.fundPrice;
        let profitLoss2 = +(profitLoss.toFixed(4));
        let lossPercent = (+(Math.abs(profitLoss) / data.fundPrice).toFixed(4) * 100).toString();
        let lossPercentArr = lossPercent.split('.');
        if (lossPercentArr[1]) {
          lossPercentArr[1] = lossPercentArr[1].substring(0, 2);
        }
        let time = +getFormatDate('ymd');
        let validDay = 0;
        if (time - parseInt(data.useTime.replace(/-/gi, '')) > 7) {
          validDay = 1;
        }
        let abs = 0;
        if (profitLoss > 0) {
          abs = 1;
        }
        let unUse = 0;
        if (data.unUse) {
          unUse = 1;
        }
        let getPrice = (data.usePrice * (+lossPercentArr.join('.') / 100)).toString();
        getPrice = Number(getPrice).toFixed(2);
        let updateForm = { profitLoss: Math.abs(profitLoss2), lossPercent: lossPercentArr.join('.'), getPrice, nowPrice: body.nowPrice, abs, validDay, unUse };
        let r = await this.useModel.updateOne({ _id: data['_id'], fundCode: body.fundCode }, { $set: updateForm }).exec();
        if (r.nModified) {
          r.id = data['_id'];
        }
        res.push(r);
      }
    }
    return res;
  }

  // 删除数据
  async deleteFunds(id: string) {
    return this.useModel.deleteOne({ _id: id });
  }

  // 卖出数据
  async useFunds(id: string) {
    let r = await this.useModel.updateOne({ _id: id }, {
      $set: {
        unUse: 1
      }
    }).exec();
    return r;
    // return this.useModel.deleteOne({ _id: id });
  }

}
