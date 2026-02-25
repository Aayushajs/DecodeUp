import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();
        const { method, url, body } = request;
        const startTime = Date.now();

        // Log incoming request
        const bodyLog = Object.keys(body || {}).length > 0 ? ` Body: ${JSON.stringify(body)}` : '';
        this.logger.log(`--> ${method} ${url}${bodyLog}`);

        return next.handle().pipe(
            tap({
                next: () => {
                    const duration = Date.now() - startTime;
                    const statusCode = response.statusCode;
                    const statusColor = statusCode < 400 ? '\x1b[32m' : '\x1b[31m';
                    this.logger.log(
                        `<-- ${method} ${url} ${statusColor}${statusCode}\x1b[0m ${duration}ms`,
                    );
                },
                error: (error) => {
                    const duration = Date.now() - startTime;
                    const statusCode = error?.status || 500;
                    this.logger.error(
                        `<-- ${method} ${url} \x1b[31m${statusCode}\x1b[0m ${duration}ms - ${error.message}`,
                    );
                },
            }),
        );
    }
}
