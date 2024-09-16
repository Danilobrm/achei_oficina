import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { QueryUserService } from 'src/services/queryUser.service';

@Controller('users')
export class UserController {
  message: string;
  statusCode: number;
  constructor(
    private readonly userService: UserService,
    private readonly queryUserService: QueryUserService,
  ) {}

  @Post('/register')
  async create(@Req() req: Request, @Res() res: Response): Promise<void> {
    const data = req.body;

    const emailInUse = await this.queryUserService.queryUserByEmail(data.email);
    console.log(emailInUse)
    if (emailInUse) {
      this.message = 'conta já existe.';
      this.statusCode = HttpStatus.CONFLICT;
    } else {
      this.message = await this.userService.create(data);
      this.statusCode = res.statusCode;
    }

    res.send({
      status: this.statusCode,
      message: this.message,
    });
  }

  @Get(':id')
  async read(@Param() params: any, @Res() res: Response): Promise<void> {
    const user = await this.userService.read(params.id);
    res.send(user);
  }

  // @Get('/')
  // async listUsers(@Res() res: Response): Promise<void> {
  //   const users = await this.userService.list();
  //   res.send(users);
  // }
}
