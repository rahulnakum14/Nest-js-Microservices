import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ra<mongo uri>',
      { dbName: 'test' },
    ),
    UserModule,
  ],
})
export class AppModule {}
