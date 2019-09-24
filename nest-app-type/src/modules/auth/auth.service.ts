import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
// 工具
import { Message } from '../../global/message';
// 状态
import { UStatus, UStatusRes } from '../../constants/const';
// 业务逻辑
import { Users } from '../interfaces/users.interface';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USERS_MODEL') private readonly userModel: Model<Users>,
        private readonly jwtService: JwtService,
    ) { }

    async vlidateUser(username: string, password: string): Promise<Message> {
        const res = await this.userModel.findOne().or([{ name: username }, { phone: username }]).exec();
        console.log(res);

        return { code: 200, message: '查询成功', data: res };
    }

}
