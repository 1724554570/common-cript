import { Controller, Get, Post, Body, Param, Delete, Request, Response } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { Users } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { Message } from '../global/message';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('/list')
    async findAll(): Promise<Message> {
        const users = this.usersService.findAll();
        return { code: 200, message: '查询成功', data: users };
    }

    @Get('find/:id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} users`;
    }

    @Delete('find/:id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} users`;
    }

    @Post()
    async create(@Body() createUsersDto: CreateUsersDto) {
        this.usersService.create(createUsersDto);
    }

    @Get('/create')
    async addOne(): Promise<Message> {
        const users: Users = {
            name: 'machine',
            age: 20,
            sex: 'man',
        };
        this.usersService.create(users);
        return { code: 200, message: '创建成功', data: [] };
    }

}
