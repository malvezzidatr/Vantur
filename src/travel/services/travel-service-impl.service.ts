import { Injectable } from '@nestjs/common';
import { CreateTravelDTO } from '../dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';
import { TravelRepository } from '../repositories/travels-repository';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { UserServiceImpl } from '../../users/services/users-service-impl.service';
import { TravelService } from './travel-service';
import { FileDTO } from '../dto/file.dto';

@Injectable()
export class TravelServiceImpl implements TravelService {
  constructor(
    private readonly travelRepository: TravelRepository,
    private readonly userServiceImpl: UserServiceImpl,
  ) {}

  async createTravel(createTravelDTO: CreateTravelDTO, file: FileDTO) {
    try {
      await this.travelRepository.createTravel(createTravelDTO, file);
      return;
    } catch (err) {
      throw new Error('Falha ao criar viagem');
    }
  }

  async getAllTravels() {
    try {
      return await this.travelRepository.getAllTravels();
    } catch (err) {
      throw new Error('Falha ao buscar viagens');
    }
  }

  async getTravelById(id: string) {
    try {
      const travel = await this.travelRepository.getTravelById(id);
      return travel;
    } catch (err) {
      throw new Error('Falha ao encontrar viagem');
    }
  }

  async addUserAsPending(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<void> {
    try {
      await this.travelRepository.updateUserToPendent(updateUserAsPendingDTO);
      return;
    } catch (err) {
      throw new Error('Falha na requisição');
    }
  }

  async addUserAsConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<void> {
    try {
      await this.travelRepository.updateUserToConfirmed(
        updateUserAsConfirmedDTO,
      );
      return;
    } catch (err) {
      throw new Error('Falha na requisição');
    }
  }
}
