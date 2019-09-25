import { Controller, Get, Post, Body, Param, Query, Render, UseInterceptors, Logger, UseGuards } from '@nestjs/common';
import { CreateUsersDto } from '../dto/create-user.dto';
import { Users } from '../interfaces/users.interface';
import { UsersService } from './users.service';
import { Message } from '../../global/message';
import { QueryParams } from '../../global/query';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { UStatus, UStatusRes } from '../../constants/const';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('/list')
    @UseGuards(AuthGuard('jwt'))
    @Render('users/list.hbs')
    async findAll(@Query() q: QueryParams): Promise<Message> {
        if (!q.pageSize) {
            q.pageSize = 10;
        }
        const users = await this.usersService.findAll(q);
        return { code: 200, message: '查询成功', data: users };
    }

    @Get('/find/:id')
    @UseGuards(AuthGuard('jwt'))
    async find(@Param('id') id): Promise<Message> {
        const users = await this.usersService.findByid(id);
        return { code: 200, message: '查询成功', data: users };
    }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createUsersDto: CreateUsersDto) {
        const res = await this.usersService.create(createUsersDto);
        return { code: 200, message: '创建成功', data: [], Res: res && res.uuid || '' };
    }

    @Post('/update/:id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id, @Body() body): Promise<Message> {
        return await this._update(id, body);
    }

    @Post('/remove/:id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id') id): Promise<Message> {
        return await this._update(id, { valid: 0 });
    }

    /**
     * 修改&删除
     * @param id uuid
     * @param data 数据
     */
    async _update(id: string, data: object) {
        const users = await this.usersService.updateById(id, data);
        return { code: 200, message: '更新成功', data: users };
    }
}
