import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from './dto/update-user-as-pending.dto';
import { TravelRepository } from './repositories/travels-repository';
import { UserService } from 'src/users/users.service';

@Injectable()
export class TravelService {
  constructor(
    private readonly travelRepository: TravelRepository,
    private readonly UserService: UserService,
  ) {}

  async create(createTravelDto: CreateTravelDto) {
    return await this.travelRepository.createTravel(createTravelDto);
  }

  findAll() {
    return `This action returns all travel`;
  }

  async findOne(id: string) {
    const travel = await this.travelRepository.findTravel(id);
    return travel;
  }

  async addUserAsPending(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<void> {
    const travel = await this.travelRepository.findTravel(
      updateUserAsPendingDTO.travelId,
    );

    const user = await this.UserService.getUserById(
      updateUserAsPendingDTO.userId,
    );

    if (!travel || !user) {
      throw new Error('Viagem ou usuário não encontrado.');
    }

    return await this.travelRepository.updateUserToPendent(
      updateUserAsPendingDTO,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
