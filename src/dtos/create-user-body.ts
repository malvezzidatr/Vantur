import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateUserBodyDTO {
  @Length(2, 20)
  @IsNotEmpty({
    message: 'O primeiro nome não pode ficar vazio',
  })
  firstName: string;

  @Length(5, 20)
  @IsNotEmpty()
  lastName: string;

  @Length(5, 50)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(8, 30)
  @IsNotEmpty()
  password?: string;
}
