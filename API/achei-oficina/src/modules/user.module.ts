// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { QueryUserService } from 'src/services/queryUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, QueryUserService],
  controllers: [UserController],
})
export class UserModule {}
