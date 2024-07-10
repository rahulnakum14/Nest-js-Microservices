import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserController } from './presentation/controllers/user.controller';
import { UserResolver } from './presentation/resolvers/user.resolver';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { ConfigModule } from './infrastructure/config/config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { LoggingInterceptor } from './presentation/interceptors/logging.interceptor';
import { HttpExceptionFilter } from './presentation/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    LoggerModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.graphql',
      ),
      // Ensure to specify the correct driver configuration
      driver: {
        type: 'graphql',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserResolver,
    CreateUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    { provide: 'APP_INTERCEPTOR', useClass: LoggingInterceptor },
    { provide: 'APP_FILTER', useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
