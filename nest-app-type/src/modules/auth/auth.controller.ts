import { Controller, Post, Body, UseInterceptors, UseGuards, Get, Inject } from '@nestjs/common';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {

    constructor(@Inject('AuthService') private readonly authService) { }

    @Post('login')
    async login(@Body() req): Promise<any> {
        // throw new HttpException('aaa', HttpStatus.BAD_REQUEST);
        return this.authService.validateUser(req.username, req.password);
    }

    @Get('token')
    async createToken(): Promise<any> {
        return this.authService.signIn();
    }

    @Get('users')
    @UseGuards(AuthGuard())
    users(): any {
        return [1];
    }

}
