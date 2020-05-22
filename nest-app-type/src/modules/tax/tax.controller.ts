import { Controller, Get, Post, Put, Body, Param, Query, Render, UseInterceptors, Logger, UseGuards, Inject, Delete } from '@nestjs/common';
import { CreateTaxDto } from '../dto/create-user.dto';
import { Message } from '../../global/message';
import { QueryParams } from '../../global/query';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { array } from './form';

@Controller('tax')
@UseInterceptors(LoggingInterceptor)
export default class FundsController {

    constructor(@Inject('TaxService') private readonly taxService) { }

    @Get('/list')
    async findAll(@Query() q: QueryParams): Promise<Message> {
        if (!q.pageSize) {
            q.pageSize = 10;
        }
        const users = await this.taxService.findAll(q);
        return { code: 200, message: '查询成功', data: users };
    }

    // 视图查看用户列表
    @Get('/views')
    @Render('tax/list.hbs')
    async findAllViews(@Query() q: QueryParams): Promise<Message> {
        if (!q.pageSize) {
            q.pageSize = 10000;
        }
        const users = await this.taxService.findAll(q);
        return { code: 200, message: '查询成功', data: users, Res: JSON.stringify(users) };
    }

    @Post('/create')
    async create(@Body() formDto: CreateTaxDto) {
        const r = await this.taxService.create(formDto);
        return { code: 200, message: '创建成功', data: r, Res: "" };
    }

    @Put('/update/:id')
    async update(@Param('id') id, @Body() body): Promise<Message> {
        return await this._update(id, body);
    }


    @Put('/update/price')
    async updatePrice(@Body() body): Promise<Message> {
        let users = await this.taxService.updateAll(body);
        return { code: 200, message: '更新成功', data: users };
    }

    @Get("/remove/:id")
    async removeById(@Param('id') id) {
        return await this.taxService.deleteFunds(id);
    }

    @Get("/use/:id")
    async useById(@Param('id') id) {
        return await this.taxService.useFunds(id);
    }

    /**
     * 修改&删除
     * @param id uuid
     * @param data 数据
     */
    async _update(id: string, data: object) {
        const users = await this.taxService.updateById(id, data);
        return { code: 200, message: '更新成功', data: users };
    }
}
