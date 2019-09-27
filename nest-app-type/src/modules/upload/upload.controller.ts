import { Controller, Post, UseInterceptors, UploadedFile, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import { resolve, getTimeDirectory } from '../../utils/utils';

@Controller('upload')
export class UploadController {

    constructor() { }

    @Post('file')
    @UseInterceptors(FileInterceptor('file', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, resolve(`uploads/${getTimeDirectory()}`));
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        }),
    }))
    async uploade(@UploadedFile() file) {
        return file;
    }
}
