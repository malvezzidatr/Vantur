// AuthController

import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthServiceImpl } from '../services/auth-service-impl.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDTO } from '../dto/sign-in.dto';
@Controller('auth')
export class AuthController {
  constructor(private authServiceImpl: AuthServiceImpl) {}

  @ApiTags('Auth')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authServiceImpl.signIn(signInDto.email, signInDto.password);
  }
}
