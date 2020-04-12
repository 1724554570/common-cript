import { Controller, Get, Post, Put, Body, Param, Query, Render, UseInterceptors, Logger, UseGuards, Inject, Delete } from '@nestjs/common';
import { CreateFundsDto } from '../dto/create-user.dto';
import { Message } from '../../global/message';
import { QueryParams } from '../../global/query';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { array } from './form';

@Controller('funds')
@UseInterceptors(LoggingInterceptor)
export default class FundsController {

    constructor(@Inject('FundsService') private readonly fundsService) { }

    @Get('/list')
    async findAll(@Query() q: QueryParams): Promise<Message> {
        if (!q.pageSize) {
            q.pageSize = 10;
        }
        const users = await this.fundsService.findAll(q);
        return { code: 200, message: '查询成功', data: users };
    }

    // 视图查看用户列表
    @Get('/views')
    @Render('funds/list.hbs')
    async findAllViews(@Query() q: QueryParams): Promise<Message> {
        if (!q.pageSize) {
            q.pageSize = 10000;
        }
        const users = await this.fundsService.findAll(q);
        return { code: 200, message: '查询成功', data: users, Res: JSON.stringify(users) };
    }

    @Post('/create')
    async create(@Body() createUsersDto: CreateFundsDto) {
        // const res = await this.fundsService.create(createUsersDto);
        // return { code: 200, message: '创建成功', data: [], Res: res && res.uuid || '' };
        let res = [];
        for (var key = 0; key < array.length; key++) {
            const r = await this.fundsService.create(array[key]);
            res.push(r);
        }
        return { code: 200, message: '创建成功', data: res, Res: "" };
    }

    @Put('/update/:id')
    async update(@Param('id') id, @Body() body): Promise<Message> {
        return await this._update(id, body);
    }


    @Put('/update/price')
    async updatePrice(@Body() body): Promise<Message> {
        // let y = {
        //     "fundCode": "004070",
        //     "nowPrice": 0.9233
        // }
        let users = await this.fundsService.updateAll(body);
        return { code: 200, message: '更新成功', data: users };
    }

    // @Post('/remove/:id')
    // async remove(@Param('id') id): Promise<Message> {
    //     return await this._update(id, { valid: 0 });
    // }

    @Get("/remove/:id")
    async removeById(@Param('id') id) {
        return await this.fundsService.deleteFunds(id);
    }

    @Get("/use/:id")
    async useById(@Param('id') id) {
        return await this.fundsService.useFunds(id);
    }

    /**
     * 修改&删除
     * @param id uuid
     * @param data 数据
     */
    async _update(id: string, data: object) {
        const users = await this.fundsService.updateById(id, data);
        return { code: 200, message: '更新成功', data: users };
    }
}
