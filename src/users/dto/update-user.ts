import { Length, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @Length(2, 20)
  firstName: string;

  @IsOptional()
  @Length(5, 20)
  lastName: string;

  @IsOptional()
  @Length(5, 50)
  @IsEmail()
  email: string;

  @IsOptional()
  @Length(8, 30)
  password?: string;
}
