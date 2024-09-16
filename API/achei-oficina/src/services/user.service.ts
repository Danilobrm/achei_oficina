import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: User): Promise<string> {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user);
      return 'conta criada com sucesso!';
    } catch (error) {
      return error;
    }
  }

  async read(id): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async list(): Promise<User[]> {
    return await this.userRepository.find({ select: { vehicles: true } });
  }
}
