import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory/inventory.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3001 },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.log('thuis si validatiopn',validationErrors);
        
        return new BadRequestException(validationErrors);
      },
    })
  );
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   exceptionFactory: (errors: ValidationError[]) => {
  //     const errorMessages = errors.map(
  //       error => `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`
  //     );
  //     return new BadRequestException(errorMessages);
  //   },
  // }));
  await app.listen();
}
bootstrap();