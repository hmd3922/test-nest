import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseInterface } from '../interceptors/response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseInterface<T>> {
        return next.handle().pipe(
            map(data => {
                // 如果响应已经是标准格式，则直接返回
                if (data && data.code !== undefined && data.message !== undefined) {
                    return data;
                }

                // 否则，转换为标准格式
                return {
                    code: 200,
                    data,
                    message: '操作成功',
                };
            }),
        );
    }
}