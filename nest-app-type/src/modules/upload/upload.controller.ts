import { Controller, Post, UseInterceptors, UploadedFile, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import { resolvePath, getTimeDirectory } from '../../utils/utils';
import { mkdirsSync } from '../../utils/fs';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';

const fileStaticPath = `/upload/${getTimeDirectory()}`;
const fileSavePath = resolvePath(`..${fileStaticPath}`);

@Controller('upload')
@UseInterceptors(LoggingInterceptor)
export class UploadController {

    constructor() {
        this.createFileSavePath();
    }

    createFileSavePath() {
        return mkdirsSync(fileSavePath);
    }

    @Post('simple')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: any, @Body() body: any) {
        if (!body || !body.uuid) {
            throw new HttpException('请求参数错误.', HttpStatus.FORBIDDEN);
        }
        const fileSaveName = `${body.uuid}-${file.originalname}`;
        const fileWritePath = join(fileSavePath, fileSaveName);
        const writeImage = createWriteStream(fileWritePath);
        writeImage.write(file.buffer);
        return {
            filename: fileSaveName,
            filepath: `${fileStaticPath}`,
        };
    }
}
