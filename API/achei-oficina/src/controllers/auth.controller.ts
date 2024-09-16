import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  authenticate(@Req() req: Request, @Res() res: Response): void {
    const data = req.body;
    data.id = req.user_id;
    const auth = this.authService.authenticate(data);

    res.send(auth);
  }
}
