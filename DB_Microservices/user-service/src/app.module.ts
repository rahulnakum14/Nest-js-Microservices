import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rahuln:HTV5asdasdasdMiJqrFO5ytZh@cluster0.zwjsixq.mongodb.net/',
      { dbName: 'test' },
    ),
    UserModule,
  ],
})
export class AppModule {}
