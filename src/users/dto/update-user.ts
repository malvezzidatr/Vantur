import { ApiPropertyOptional } from '@nestjs/swagger';
import { Length, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'Person first name',
    default: 'Joseph',
  })
  @IsOptional()
  @Length(2, 20)
  first_name?: string;

  @ApiPropertyOptional({
    description: 'Person last name',
    default: 'Stranger',
  })
  @IsOptional()
  @Length(5, 20)
  last_name?: string;

  @ApiPropertyOptional({
    description: 'Person email',
    default: 'example@test.com',
  })
  @IsOptional()
  @Length(5, 50)
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description:
      'Person password. Password will be encrypted in database. Minimum 8 characters.',
  })
  @IsOptional()
  @Length(8, 30)
  password?: string;
}
