import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-user.dto';
import { Users } from './interfaces/users.interface';
import { UsersService } from './users.service';
import { Message } from '../global/message';

function TestData() {
    const random = Math.random();
    const fixed = Math.floor(random * 10 + 1);
    const age = Math.floor(random * 100 + 1);
    const users: Users = {
        name: `machine${random.toFixed(fixed)}`,
        age,
        sex: `${random > 0.5 ? 'man' : 'woman'}`,
    };
    return users;
}

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('/list')
    async findAll(): Promise<Message> {
        const users = await this.usersService.findAll();
        return { code: 200, message: '查询成功', data: users };
    }

    @Get('/find/:id')
    async find(@Param('id') id): Promise<Message> {
        const users = await this.usersService.findByid(id);
        return { code: 200, message: '查询成功', data: users };
    }

    @Post('/create')
    async create(@Body() createUsersDto: CreateUsersDto) {
        const res = await this.usersService.create(createUsersDto);
        return { code: 200, message: '创建成功', data: [], Res: res && res.uuid || '' };
    }

    @Post('/update/:id')
    async update(@Param('id') id): Promise<Message> {
        const data = TestData();
        return await this._update(id, data);
    }

    @Post('/remove/:id')
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
