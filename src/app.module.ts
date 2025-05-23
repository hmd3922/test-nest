import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Item, ItemSchema } from './item.schema';
import { User,UserSchema } from './user/user.schema';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // 全局可用
      envFilePath: '.env', // 指定 .env 文件路径
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/nestjs-demo'), // 连接 MongoDB 数据库
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]), // 注册模型
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // 注册模型
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
