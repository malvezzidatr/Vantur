import { CreateUserDTO } from '../../users/dto/create-user-body';

export class CreateTravelDto {
  id: string;

  value: string;

  departureLocation: string;

  destination: string;

  seats: number;

  owner: string;

  participants: {
    confirmed: CreateUserDTO[];
    pendents: CreateUserDTO[];
  };

  departure: {
    day: Date;
    places: string[];
  };

  arrival: {
    day: Date;
    places: string[];
  };
}
