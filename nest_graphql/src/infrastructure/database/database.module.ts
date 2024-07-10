import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        uri: configService.mongoUri,
      }),
    }),
  ],
})
export class DatabaseModule {}
