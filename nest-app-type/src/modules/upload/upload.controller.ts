import { Controller, Post, UseInterceptors, UploadedFile, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import { resolve, getTimeDirectory } from '../../utils/utils';
import { mkdirsSync } from '../../utils/fs';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';

const fileStaticPath = `/upload/${getTimeDirectory()}`;
const fileSavePath = resolve(`public/${fileStaticPath}`);

@Controller('upload')
@UseInterceptors(LoggingInterceptor)
export class UploadController {

    constructor() {
        // this.isExistDir();
        this.createFileSavePath();
    }

    isExistDir(path?: any) {
        if (path) {
            return mkdirsSync(path);
        } else {
            return mkdirsSync(resolve(`uploads/${getTimeDirectory()}`));
        }
    }

    // @Post('file')
    // @UseInterceptors(FileInterceptor('file', {
    //     storage: multer.diskStorage({
    //         destination: (req, file, cb) => {
    //             console.log((req));
    //             cb(null, resolve(`uploads/${getTimeDirectory()}`));
    //         },
    //         filename: (req, file, cb) => {
    //             cb(null, file.originalname);
    //         },
    //     }),
    // }))
    // async upload(@UploadedFile() file) {
    //     return file;
    // }

    createFileSavePath() {
        this.isExistDir(fileSavePath);
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
