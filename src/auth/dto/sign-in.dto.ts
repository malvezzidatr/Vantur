import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    description: 'E-mail to log in',
    default: 'example@test.com',
  })
  @IsNotEmpty({
    message: 'E-mail cant be empty',
  })
  email: string;

  @ApiProperty({
    description: 'Password to log in',
    default: 'teste1234',
  })
  @IsNotEmpty({
    message: 'Password cant be empty',
  })
  password: string;
}
