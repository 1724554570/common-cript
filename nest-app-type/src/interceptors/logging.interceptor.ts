import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // 取得controller name
        const controller = context.getClass().name;
        // 取得method name
        const handler = context.getHandler().name;
        Logger.info(`Before...${controller}-${handler}`);
        return next.handle().pipe(
            catchError((err) => {
                Logger.error(`Exception...${JSON.stringify(err)}`);
                return throwError(new HttpException({ status: err.status, message: err.response, data: null }, err.status));
            }),
            // tap((res) => { }),
            map((res) => {
                if ('findAll' === handler) {
                    Logger.info(`Result...查询成功`);
                } else {
                    Logger.info(`Result...${JSON.stringify(res)}`);
                }
                return res;
            })
        );
    }
}
