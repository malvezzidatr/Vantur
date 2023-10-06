import { ArrivalDto } from './arrival.dto';
import { DepartureDto } from './departure.dto';
import { ParticipantsDto } from './participants.dto';

export class CreateTravelDto {
  id: string;

  value: string;

  departure_location: string;

  destination: string;

  seats: number;

  ownerId: string;

  participants: ParticipantsDto;

  departure: DepartureDto;

  arrival: ArrivalDto;
}
