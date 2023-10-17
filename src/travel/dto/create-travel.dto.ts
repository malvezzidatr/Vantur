import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDTO } from 'src/users/dto/create-user-body';

export class CreateTravelDTO {
  id: string;

  @ApiProperty({
    description: 'Travel value',
    default: '150,00',
  })
  @IsNotEmpty({
    message: 'Value cant be empty',
  })
  value: string;

  @ApiProperty({
    description: 'Location of travel departure',
    default: 'São Paulo',
  })
  @IsNotEmpty({
    message: 'Departure location cant be empty',
  })
  departure_location: string;

  @ApiProperty({
    description: 'Travel destination',
    default: 'Maragogi',
  })
  @IsNotEmpty({
    message: 'Destination cant be empty',
  })
  destination: string;

  @ApiProperty({
    description: 'Number of seats on the travel.',
    default: 15,
  })
  @IsNotEmpty({
    message: 'seats cant be empty',
  })
  seats: number;

  @ApiProperty({
    description: 'Person who is the organizer of the trip',
    default: uuidv4(),
  })
  @IsNotEmpty({
    message: 'Owner id cant be empty',
  })
  ownerId: string;

  confirmeds: CreateUserDTO[];

  pendents: CreateUserDTO[];
}
