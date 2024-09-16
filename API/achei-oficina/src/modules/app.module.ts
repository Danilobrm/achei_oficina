import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
// import { UserModule } from '../modules/user.module';
// import { VehicleModule } from './vehicle.module';
import { IsAuthenticated } from 'src/middlewares/IsAuthenticated.middleware';
import { ValidateUserAuthentication } from 'src/middlewares/ValidateUserAuthentication.middleware';
// import { AuthModule } from './auth.module';
import { QueryUserService } from 'src/services/queryUser.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/models/user.entity';
// import { Vehicle } from 'src/models/vehicle.entity';
import { NextFunction } from 'express';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Vehicle } from 'src/models/vehicle.entity';
import { Repository } from 'typeorm';
import { UserModule } from './user.module';
import { VehicleModule } from './vehicle.module';
import { AuthModule } from './auth.module';
// import { Repository } from 'typeorm';
// import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [
    UserModule,
    VehicleModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Vehicle]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: 'postgres',
      password: '98608418',
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Vehicle],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, QueryUserService],
})
export class AppModule implements NestModule {
  // constructor(private readonly queryUserService: QueryUserService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAuthenticated).forRoutes('/vehicles');
    consumer.apply(ValidateUserAuthentication).forRoutes('/auth/login');
  }
}

// consumer
//   .apply((next: NextFunction) => {
//     const user = this.queryUserService.queryUserByEmail('email@email.com');

//     if (user) return;
//     next();
//   })
//   .forRoutes('/register');
