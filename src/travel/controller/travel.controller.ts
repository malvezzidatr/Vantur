import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TravelService } from '../services/travel.service';
import { CreateTravelDto } from '../dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from '../dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from '../dto/update-user-as-confirmed.dto';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post('create')
  createTravel(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.createTravel(createTravelDto);
  }

  @Get()
  getAllTravels() {
    return this.travelService.getAllTravels();
  }

  @Get(':id')
  getTravelById(@Param('id') id: string) {
    return this.travelService.getTravelById(id);
  }

  @Patch('pendent')
  addUserAsPendent(@Body() updateUserAsPendingDTO: UpdateUserAsPendingDTO) {
    return this.travelService.addUserAsPending(updateUserAsPendingDTO);
  }

  @Patch('confirm')
  addUserAsConfirmed(
    @Body() updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ) {
    return this.travelService.addUserAsConfirmed(updateUserAsConfirmedDTO);
  }
}
