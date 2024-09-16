import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/models/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async add(data: Vehicle, user_id: string): Promise<string> {
    try {
      const vehicle = await this.vehicleRepository.findOne({
        where: { plate: data.plate, user: { id: user_id } },
      });

      if (vehicle) return 'carro já associado a conta!';
      console.log(vehicle);
      const userVehicle = this.vehicleRepository.create(data);
      await this.vehicleRepository.save(userVehicle);
      return 'carro adicionado a conta!';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async list(user_id: string): Promise<Vehicle[]> {
    try {
      return await this.vehicleRepository.find({
        where: { user: { id: user_id } },
      });
    } catch (error) {
      console.log(error);
    }
  }

  // listByUser(id: string): IListByUser {
  //   const user = users.find((user) => user.id === id);
  //   console.log(user);
  //   return {
  //     owner: user.name,
  //     owner_cpf: user.cpf,
  //     vehicles: user.vehicles,
  //   };
  // }
}
