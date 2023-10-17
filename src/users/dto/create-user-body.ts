import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { CreateTravelDTO } from '../../travel/dto/create-travel.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  id: string;

  @ApiProperty({
    description: 'Person first name',
    default: 'Wagner',
  })
  @Length(2, 20)
  @IsNotEmpty({
    message: 'O primeiro nome não pode ficar vazio',
  })
  first_name: string;

  @ApiProperty({
    description: 'Person last name',
    default: 'Aldo',
  })
  @Length(2, 20)
  @IsNotEmpty({
    message: 'Sobrenome não pode ficar ficar vazio',
  })
  last_name: string;

  @ApiProperty({
    description: 'Person email',
    default: 'example@test.com',
  })
  @Length(5, 50)
  @IsNotEmpty({
    message: 'Email não pode ficar vazio',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Person password. Password will encrypted in database. Minimum 8 characters.',
    default: 'teste1234',
  })
  @Length(8, 30)
  @IsNotEmpty({
    message: 'Senha não pode ficar vazio',
  })
  password?: string;

  travels: CreateTravelDTO[];
}
