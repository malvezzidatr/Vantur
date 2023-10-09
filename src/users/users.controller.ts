import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-body';
import { createRandomSalt, encryptPsswd } from '../utils/crypto';
import { v4 as uuidv4 } from 'uuid';
import { UserServiceImpl } from './services/users-service-impl.service';
import { UpdateUserDTO } from './dto/update-user';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userServiceImpl: UserServiceImpl) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    const { email, first_name, last_name, password, travels } = createUserDTO;
    const salt = await createRandomSalt(16, 'hex');

    try {
      const user = await this.userServiceImpl.createUser({
        id: uuidv4(),
        email,
        first_name,
        last_name,
        password: String(await encryptPsswd(password)),
        salt,
        travels,
      });
      return user;
    } catch (err) {
      throw new HttpException(
        'Falha ao criar o usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('list/id/:id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userServiceImpl.getUserById(id);
      return user;
    } catch (err) {
      throw new HttpException(
        'Falha ao encontrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('list/email/:email')
  @HttpCode(HttpStatus.OK)
  async getUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.userServiceImpl.getUserByEmail(email);
      return user;
    } catch (err) {
      throw new HttpException(
        'Falha ao encontrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    try {
      const updatedUser = await this.userServiceImpl.updateUser(
        id,
        updateUserDTO,
      );
      return updatedUser;
    } catch (err) {
      throw new HttpException(
        'Falha ao atualizar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
