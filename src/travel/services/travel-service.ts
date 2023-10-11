import { CreateTravelDto } from '../dto/create-travel.dto';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';

export abstract class TravelService {
  abstract createTravel(createTravelDTO: CreateTravelDto): Promise<any>;
  abstract getAllTravels(): Promise<any>;
  abstract getTravelById(id: string): Promise<any>;
  abstract addUserAsPending(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<any>;
  abstract addUserAsConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<any>;
}
