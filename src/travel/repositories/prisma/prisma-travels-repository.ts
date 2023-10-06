import { Injectable } from '@nestjs/common';
import { TravelRepository } from '../travels-repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTravelDto } from 'src/travel/dto/create-travel.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrismaTravelRepository implements TravelRepository {
  constructor(private prisma: PrismaService) {}
  abstract: any;

  async createTravel(createTravelDto: CreateTravelDto) {
    const { departure_location, destination, seats, value, ownerId } =
      createTravelDto;
    await this.prisma.travel.create({
      data: {
        departure_location,
        destination,
        id: uuidv4(),
        seats,
        value,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
  }
}
