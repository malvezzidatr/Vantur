import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { TravelRepository } from './repositories/travels-repository';

@Injectable()
export class TravelService {
  constructor(private readonly travelRepository: TravelRepository) {}

  async create(createTravelDto: CreateTravelDto) {
    return await this.travelRepository.createTravel(createTravelDto);
  }

  findAll() {
    return `This action returns all travel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} travel`;
  }

  update(id: number, updateTravelDto: UpdateTravelDto) {
    return `This action updates a #${id} travel`;
  }

  remove(id: number) {
    return `This action removes a #${id} travel`;
  }
}
