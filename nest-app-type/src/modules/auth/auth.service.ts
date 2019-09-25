import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// 工具
import Base64 from '../../utils/base64';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @Inject('UsersService') private readonly usersService,
    ) { }

    async validateUser(username: string, usePassword: string): Promise<any> {
        const res = await this.usersService.findByName(username);
        if (!res) {
            throw new UnauthorizedException('用户名不存在。');
        }
        const basePassword = Base64.encode(usePassword);
        const dbPassword = res.password;
        if (dbPassword != basePassword) {
            throw new UnauthorizedException('密码错误。');
        }
        // replace(/(\d{2})(?=\d)/g, '$1 ').split(' ');
        res.password = '********';
        const token = this.signToken(res);
        return token;
    }

    signToken(user: any) {
        const { username, uuid, _id } = user;
        const payload = { username, uuid, _id };
        return {
            username,
            uuid,
            token: 'Bearer ' + this.jwtService.sign(payload),
        };
    }

}
