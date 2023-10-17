import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class UpdateUserAsConfirmedDTO {
  @ApiProperty({
    description: 'User who the owner confirmed for the trip',
    default: uuidv4(),
  })
  @IsNotEmpty({
    message: 'User id cant be empty',
  })
  userId: string;

  @ApiProperty({
    description: 'Id referring to the trip',
    default: uuidv4(),
  })
  @IsNotEmpty({
    message: 'Travel id cant be empty',
  })
  travelId: string;
}
