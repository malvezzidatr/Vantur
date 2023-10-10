import { CreateTravelDto } from '../dto/create-travel.dto';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';

export abstract class TravelRepository {
  abstract createTravel(createTravelDto: CreateTravelDto): Promise<void>;
  abstract findTravel(id: string): Promise<CreateTravelDto>;
  abstract updateUserToPendent(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<any>;
  abstract updateUserToConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<any>;
  abstract getAllTravels(): Promise<any>;
}
