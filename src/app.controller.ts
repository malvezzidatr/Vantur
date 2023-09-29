import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateUserBodyDTO } from './dtos/create-user-body';
import { UserService } from './app.service';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}

  @Post('/user/create')
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
