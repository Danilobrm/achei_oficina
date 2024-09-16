import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class IsAuthenticated implements NestMiddleware {
  private readonly jwtSecret: string = process.env.JWT_SECRET;

  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;
    if (!authToken)
      return res.status(401).json('Usuário precisa estar logado.');

    const [, token] = authToken.split(' ');

    try {
      // validar o token
      const { sub } = verify(token, this.jwtSecret) as JwtPayload;
      req.user_id = sub;
      next();
    } catch (error) {
      return res.status(401).end();
    }
  }
}
