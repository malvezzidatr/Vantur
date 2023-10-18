import { CreateTravelDTO } from '../dto/create-travel.dto';
import { FileDTO } from '../dto/file.dto';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';

export abstract class TravelRepository {
  abstract createTravel(
    createTravelDTO: CreateTravelDTO,
    file: FileDTO,
  ): Promise<void>;
  abstract getTravelById(id: string): Promise<CreateTravelDTO>;
  abstract updateUserToPendent(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<any>;
  abstract updateUserToConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<any>;
  abstract getAllTravels(): Promise<CreateTravelDTO[]>;
}
