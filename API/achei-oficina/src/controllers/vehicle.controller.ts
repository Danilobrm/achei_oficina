import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('/add')
  async add(@Req() req: Request, @Res() res: Response): Promise<void> {
    const vehicle = req.body;
    vehicle.type.toLowerCase();
    const message = await this.vehicleService.add(vehicle, req.user_id);

    res.send({
      statusCode: res.statusCode,
      message,
    });
  }

  @Get('/list')
  list(@Req() req: Request, @Res() res: Response): void {
    const user_id = req.user_id;
    const vehicles = this.vehicleService.list(user_id);

    res.json({
      vehicles,
    });
  }

  // @Get('/list/:id')
  // listByUser(@Res() res: Response, @Param() params: any): void {
  //   const vehicles = this.vehicleService.listByUser(params.id);

  //   res.json({
  //     vehicles,
  //   });
  // }
}
