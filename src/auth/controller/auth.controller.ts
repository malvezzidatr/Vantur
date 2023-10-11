import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthServiceImpl } from '../services/auth-service-impl.service';
@Controller('auth')
export class AuthController {
  constructor(private authServiceImpl: AuthServiceImpl) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authServiceImpl.signIn(signInDto.email, signInDto.password);
  }
}
