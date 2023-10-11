import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { TravelServiceImpl } from '../services/travel-service-impl.service';
import { CreateTravelDto } from '../dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelServiceImpl: TravelServiceImpl) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createTravel(
    @Body() createTravelDto: CreateTravelDto,
    @Res() response: Response,
  ) {
    try {
      await this.travelServiceImpl.createTravel(createTravelDto);
      return response.status(HttpStatus.CREATED).send();
    } catch (err) {
      throw new HttpException('Falha ao criar viagem', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllTravels(@Res() response: Response) {
    try {
      const travels = await this.travelServiceImpl.getAllTravels();
      return response.status(HttpStatus.OK).send(travels);
    } catch (err) {
      throw new HttpException(
        'Falha ao buscar viagens',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTravelById(@Param('id') id: string, @Res() response: Response) {
    try {
      const travel = await this.travelServiceImpl.getTravelById(id);
      return response.status(HttpStatus.OK).send(travel);
    } catch (err) {
      throw new HttpException(
        'Falha ao encontrar viagem',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Patch('pendent')
  async addUserAsPendent(
    @Body() updateUserAsPendingDTO: UpdateUserAsPendingDTO,
    @Res() response: Response,
  ) {
    try {
      await this.travelServiceImpl.addUserAsPending(updateUserAsPendingDTO);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      throw new HttpException('Falha na requisição', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Patch('confirm')
  async addUserAsConfirmed(
    @Body() updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
    @Res() response: Response,
  ) {
    try {
      await this.travelServiceImpl.addUserAsConfirmed(updateUserAsConfirmedDTO);
      return response.status(HttpStatus.NO_CONTENT).send();
    } catch (err) {
      throw new HttpException('Falha na requisição', HttpStatus.BAD_REQUEST);
    }
  }
}
