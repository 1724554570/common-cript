import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { ExtractJwt } from 'passport-jwt';
/**
 * * 我们遵循了之前描述的所有Passport策略。在我们使用passport-local的用例中，没有配置选项，所以我们的构造函数只是调用super()，没有选项对象。
 */
/**
 * 把用户信息存储到user中的类,继承内置类PassportStrategy、重写validate方法
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    async validate(payload: any) {
        console.log(`validate${JSON.stringify(payload)}`);
        if (!payload) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}
