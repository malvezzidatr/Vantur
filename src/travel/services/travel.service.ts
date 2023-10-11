import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from '../dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';
import { TravelRepository } from '../repositories/travels-repository';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { UserServiceImpl } from '../../users/services/users-service-impl.service';

@Injectable()
export class TravelService {
  constructor(
    private readonly travelRepository: TravelRepository,
    private readonly userServiceImpl: UserServiceImpl,
  ) {}

  async createTravel(createTravelDto: CreateTravelDto) {
    return await this.travelRepository.createTravel(createTravelDto);
  }

  async getAllTravels() {
    return await this.travelRepository.getAllTravels();
  }

  async getTravelById(id: string) {
    const travel = await this.travelRepository.getTravelById(id);
    return travel;
  }

  async addUserAsPending(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<void> {
    const travel = await this.travelRepository.getTravelById(
      updateUserAsPendingDTO.travelId,
    );

    const user = await this.userServiceImpl.getUserById(
      updateUserAsPendingDTO.userId,
    );

    if (!travel || !user) {
      throw new Error('Viagem ou usuário não encontrado.');
    }

    return await this.travelRepository.updateUserToPendent(
      updateUserAsPendingDTO,
    );
  }

  async addUserAsConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<void> {
    const travel = await this.travelRepository.getTravelById(
      updateUserAsConfirmedDTO.travelId,
    );

    const user = await this.userServiceImpl.getUserById(
      updateUserAsConfirmedDTO.userId,
    );

    if (!travel || !user) {
      throw new Error('Viagem ou usuário não encontrado.');
    }

    return await this.travelRepository.updateUserToConfirmed(
      updateUserAsConfirmedDTO,
    );
  }
}
