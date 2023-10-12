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
  Res,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user-body';
import { encryptPsswd } from '../../utils/crypto';
import { v4 as uuidv4 } from 'uuid';
import { UserServiceImpl } from '../services/users-service-impl.service';
import { UpdateUserDTO } from '../dto/update-user';
import { AuthGuard } from '../../auth/auth.guard';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userServiceImpl: UserServiceImpl) {}

  @Post('create')
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
    @Res() response: Response,
  ) {
    try {
      await this.userServiceImpl.createUser(createUserDTO);
      return response.status(HttpStatus.CREATED).send();
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
  async getUserById(@Param('id') id: string, @Res() response: Response) {
    try {
      const user = await this.userServiceImpl.getUserById(id);
      return response.status(HttpStatus.OK).send(user);
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
  async getUserByEmail(
    @Param('email') email: string,
    @Res() response: Response,
  ) {
    try {
      const user = await this.userServiceImpl.getUserByEmail(email);
      return response.status(HttpStatus.OK).send(user);
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
    @Res() response: Response,
  ) {
    try {
      await this.userServiceImpl.updateUser(id, updateUserDTO);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      throw new HttpException(
        'Falha ao atualizar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
