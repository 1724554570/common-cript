import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
/**
 * * 我们遵循了之前描述的所有Passport策略。在我们使用passport-local的用例中，没有配置选项，所以我们的构造函数只是调用super()，没有选项对象。
 */
/**
 * 把用户信息存储到user中的类,继承内置类PassportStrategy、重写validate方法
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') { // 继承PassportStrategy方法抛出的类，传递一个Strategy ,第二个参数是自定义的加密的字符串

    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        console.log(`LocalStrategy validate`);
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException(); // 抛出未授权异常
        }
        return user;
    }
}
