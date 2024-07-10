import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
