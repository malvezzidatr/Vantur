import { CreateTravelDTO } from '../dto/create-travel.dto';
import { FileDTO } from '../dto/file.dto';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';

export abstract class TravelService {
  abstract createTravel(
    createTravelDTO: CreateTravelDTO,
    file: FileDTO[],
  ): Promise<any>;
  abstract getAllTravels(): Promise<any>;
  abstract getTravelById(id: string): Promise<any>;
  abstract addUserAsPending(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<any>;
  abstract addUserAsConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<any>;
}
