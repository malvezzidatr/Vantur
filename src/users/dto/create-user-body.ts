import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { CreateTravelDto } from 'src/travel/dto/create-travel.dto';

export class CreateUserDTO {
  id: string;

  @Length(2, 20)
  @IsNotEmpty({
    message: 'O primeiro nome não pode ficar vazio',
  })
  first_name: string;

  @Length(2, 20)
  @IsNotEmpty({
    message: 'Sobrenome não pode ficar ficar vazio',
  })
  last_name: string;

  @Length(5, 50)
  @IsNotEmpty({
    message: 'Email não pode ficar vazio',
  })
  @IsEmail()
  email: string;

  @Length(8, 30)
  @IsNotEmpty({
    message: 'Senha não pode ficar vazio',
  })
  password?: string;

  salt: string;

  travels: CreateTravelDto[];
}
