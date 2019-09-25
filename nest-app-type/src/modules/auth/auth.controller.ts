import { Controller, Post, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() req): Promise<any> {
        return this.authService.validateUser(req.username, req.password);
    }

}
