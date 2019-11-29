import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Logger, LoggerError, LoggerOther } from '../utils/log4js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 取得controller name
        const controller = context.getClass().name;
        // 取得method name
        const handler = context.getHandler().name;
        // 格式化返回数据
        return next.handle().pipe(
            catchError((err) => {
                LoggerError.error(`\r\n Before      ${controller}-${handler} \r\n Exception   ${JSON.stringify(err)} \r\n`);
                return throwError(new HttpException({ status: err.status, message: err.response, data: null }, err.status));
            }),
            tap((res) => {
                LoggerOther.info(`\r\n Before      ${controller}-${handler} \r\n Exception   ${JSON.stringify(res)} \r\n`);
            }),
            map((res) => {
                // if ('findAll' === handler) {
                //     Logger.info(`\r\n Before   ${controller}-${handler} \r\n Result   查询成功 \r\n`);
                // } else {
                //     Logger.info(`\r\n Before   ${controller}-${handler} \r\n Result   ${JSON.stringify(res)} \r\n`);
                // }
                Logger.info(`\r\n Before   ${controller}-${handler} \r\n Result   ${JSON.stringify(res)} \r\n`);
                return res;
            })
        );
    }
}
