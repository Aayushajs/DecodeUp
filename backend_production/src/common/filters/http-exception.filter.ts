import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger('ExceptionFilter');

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: number;
        let message: string | string[];
        let error: string;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const res = exceptionResponse as Record<string, any>;
                message = res.message || exception.message;
                error = res.error || 'Error';
            } else {
                message = exception.message;
                error = 'Error';
            }
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
            error = 'Internal Server Error';
        }

        const errorResponse = {
            success: false,
            statusCode: status,
            error,
            message,
            path: request.url,
            method: request.method,
            timestamp: new Date().toISOString(),
        };

        this.logger.error(
            `${request.method} ${request.url} ${status} - ${JSON.stringify(message)}`,
        );

        response.status(status).json(errorResponse);
    }
}
