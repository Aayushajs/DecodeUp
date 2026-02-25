import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { APP_CONFIG } from './config/app.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Morgan-style HTTP request logging
  app.use(
    morgan('dev', {
      stream: {
        write: (message: string) => {
          logger.log(message.trim());
        },
      },
    }),
  );

  // Enable CORS for frontend integration
  app.enableCors(APP_CONFIG.CORS);

  // Global exception filter for clean error responses
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Enable global validation pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe(APP_CONFIG.VALIDATION));

  const port = process.env.PORT ?? APP_CONFIG.DEFAULT_PORT;
  await app.listen(port);
  logger.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
