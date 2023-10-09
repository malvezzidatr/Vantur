import { Injectable } from '@nestjs/common';
import { TravelRepository } from '../travels-repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTravelDto } from 'src/travel/dto/create-travel.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserAsPendingDTO } from 'src/travel/dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from 'src/travel/dto/update-user-as-confirmed.dto';

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

  async findTravel(id: string): Promise<any> {
    return await this.prisma.travel.findUnique({
      where: { id: id },
    });
  }

  async updateUserToPendent(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<any> {
    await this.prisma.pendingUser.create({
      data: {
        id: uuidv4(),
        travel: {
          connect: { id: updateUserAsPendingDTO.travelId },
        },
        user: {
          connect: { id: updateUserAsPendingDTO.userId },
        },
      },
    });
  }

  async updateUserToConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<any> {
    await this.prisma.confirmedUser.create({
      data: {
        id: uuidv4(),
        travel: {
          connect: { id: updateUserAsConfirmedDTO.travelId },
        },
        user: {
          connect: { id: updateUserAsConfirmedDTO.userId },
        },
      },
    });

    await this.prisma.pendingUser.deleteMany({
      where: {
        userId: updateUserAsConfirmedDTO.userId,
      },
    });
  }
}
