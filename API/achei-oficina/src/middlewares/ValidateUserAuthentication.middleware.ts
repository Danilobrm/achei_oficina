import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { QueryUserService } from 'src/services/queryUser.service';

@Injectable()
export class ValidateUserAuthentication implements NestMiddleware {
  constructor(private readonly queryUserService: QueryUserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await this.queryUserService.queryUserByEmail(email);
    if (!user)
      return res
        .status(400)
        .send({ message: 'usuário não existe na base de dados!' });

    const passwordMatch = password === user.password;
    if (!passwordMatch)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'senha incorreta!' });

    req.user_id = user.id;
    next();
  }
}
