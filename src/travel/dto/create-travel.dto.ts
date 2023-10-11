import { CreateUserDTO } from 'src/users/dto/create-user-body';

export class CreateTravelDto {
  id: string;

  value: string;

  departure_location: string;

  destination: string;

  seats: number;

  ownerId: string;

  confirmeds: CreateUserDTO[];

  pendents: CreateUserDTO[];
}
