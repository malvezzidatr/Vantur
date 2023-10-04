import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserDTO {
  id: string;

  @Length(2, 20)
  @IsNotEmpty({
    message: 'O primeiro nome não pode ficar vazio',
  })
  firstName: string;

  @Length(5, 20)
  @IsNotEmpty({
    message: 'Sobrenome não pode ficar ficar vazio',
  })
  lastName: string;

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
}
