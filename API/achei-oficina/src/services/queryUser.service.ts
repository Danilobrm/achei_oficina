import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

export class QueryUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async queryUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async queryUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
