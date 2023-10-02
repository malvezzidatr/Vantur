import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserBodyDTO } from './dtos/create-user-body';
import { UserService } from './app.service';

@Controller('user')
export class AppController {
  constructor(private userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserBodyDTO): Promise<any> {
    const { email, firstName, lastName, password } = body;

    try {
      const user = await this.userService.createUser({
        email,
        firstName,
        lastName,
        password,
      });
      return user;
    } catch (err) {
      throw new HttpException(
        'Falha ao criar o usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('list/id/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number) {
    try {
      const user = await this.userService.getUserById(Number(id));
      return user;
    } catch (err) {
      throw new HttpException(
        'Falha ao encontrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('list/email/:email')
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      return user;
    } catch (err) {
      throw new HttpException(
        'Falha ao encontrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
