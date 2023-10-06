import { CreateTravelDto } from '../dto/create-travel.dto';

export abstract class TravelRepository {
  abstract createTravel(createTravelDto: CreateTravelDto): Promise<void>;
}
