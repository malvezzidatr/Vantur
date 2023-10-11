import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from '../dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';
import { TravelRepository } from '../repositories/travels-repository';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { UserServiceImpl } from '../../users/services/users-service-impl.service';
import { TravelService } from './travel-service';

@Injectable()
export class TravelServiceImpl implements TravelService {
  constructor(
    private readonly travelRepository: TravelRepository,
    private readonly userServiceImpl: UserServiceImpl,
  ) {}

  async createTravel(createTravelDto: CreateTravelDto) {
    try {
      await this.travelRepository.createTravel(createTravelDto);
      return;
    } catch (err) {
      throw new Error();
    }
  }

  async getAllTravels() {
    try {
      return await this.travelRepository.getAllTravels();
    } catch (err) {
      throw new Error();
    }
  }

  async getTravelById(id: string) {
    try {
      const travel = await this.travelRepository.getTravelById(id);
      return travel;
    } catch (err) {
      throw new Error();
    }
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
    try {
      await this.travelRepository.updateUserToPendent(updateUserAsPendingDTO);
      return;
    } catch (err) {
      throw new Error();
    }
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

    try {
      await this.travelRepository.updateUserToConfirmed(
        updateUserAsConfirmedDTO,
      );
      return;
    } catch (err) {
      throw new Error();
    }
  }
}
