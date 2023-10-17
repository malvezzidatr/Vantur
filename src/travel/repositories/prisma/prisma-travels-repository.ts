import { Injectable } from '@nestjs/common';
import { TravelRepository } from '../travels-repository';
import { PrismaService } from '../../../database/prisma.service';
import { CreateTravelDTO } from '../../../travel/dto/create-travel.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserAsPendingDTO } from '../../../travel/dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from '../../../travel/dto/update-user-as-confirmed.dto';

@Injectable()
export class PrismaTravelRepository implements TravelRepository {
  constructor(private prisma: PrismaService) {}

  async getAllTravels(): Promise<any> {
    try {
      return await this.prisma.travel.findMany({
        select: {
          id: true,
          departure_location: true,
          destination: true,
          value: true,
          seats: true,
          confirmeds: {
            select: {
              id: true,
            },
          },
          owner: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      });
    } catch (err) {
      throw new Error('Falha ao buscar viagens');
    }
  }

  async createTravel(createTravelDTO: CreateTravelDTO) {
    try {
      const { departure_location, destination, seats, value, ownerId } =
        createTravelDTO;
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
    } catch (err) {
      throw new Error('Falha ao criar viagem');
    }
  }

  async getTravelById(id: string): Promise<any> {
    try {
      return await this.prisma.travel.findUnique({
        where: { id: id },
        select: {
          id: true,
          departure_location: true,
          destination: true,
          seats: true,
          value: true,
          owner: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
          confirmeds: {
            select: {
              user: true,
            },
          },
          pendents: {
            select: {
              user: true,
            },
          },
        },
      });
    } catch (err) {
      throw new Error('Falha ao buscar viagem');
    }
  }

  async updateUserToPendent(
    updateUserAsPendingDTO: UpdateUserAsPendingDTO,
  ): Promise<any> {
    try {
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
    } catch (err) {
      throw new Error('Falha ao atualizar usuário para pendente');
    }
  }

  async updateUserToConfirmed(
    updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ): Promise<any> {
    try {
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
    } catch (err) {
      throw new Error('Falha ao atualizar usuário para confirmado');
    }
  }
}
