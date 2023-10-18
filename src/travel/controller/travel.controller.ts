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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TravelServiceImpl } from '../services/travel-service-impl.service';
import { CreateTravelDTO } from '../dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';
import { Response } from 'express';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from '../dto/file.dto';

@ApiBearerAuth('authorization')
@ApiTags('Travel')
@Controller('travel')
export class TravelController {
  constructor(private readonly travelServiceImpl: TravelServiceImpl) {}

  // @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createTravel(
    @Body() createTravelDTO: CreateTravelDTO,
    @Res() response: Response,
    @UploadedFile() file: FileDTO,
  ) {
    try {
      await this.travelServiceImpl.createTravel(createTravelDTO, file);
      return response.status(HttpStatus.CREATED).send();
    } catch (err) {
      throw new HttpException('Falha ao criar viagem', HttpStatus.BAD_REQUEST);
    }
  }

  // @UseGuards(AuthGuard)
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
