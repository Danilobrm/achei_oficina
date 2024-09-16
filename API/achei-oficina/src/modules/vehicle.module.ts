// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { VehicleService } from 'src/services/vehicle.service';
import { VehicleController } from 'src/controllers/vehicle.controller';
import { Vehicle } from 'src/models/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [VehicleService],
  controllers: [VehicleController],
})
export class VehicleModule {}
