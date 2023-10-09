import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TravelService } from './travel.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from './dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from './dto/update-user-as-confirmed.dto';

@Controller('travel')
export class TravelController {
  constructor(private readonly travelService: TravelService) {}

  @Post()
  create(@Body() createTravelDto: CreateTravelDto) {
    return this.travelService.create(createTravelDto);
  }

  @Get()
  findAll() {
    return this.travelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelService.findOne(id);
  }

  @Patch('pendent')
  update(@Body() updateUserAsPendingDTO: UpdateUserAsPendingDTO) {
    return this.travelService.addUserAsPending(updateUserAsPendingDTO);
  }

  @Patch('confirm')
  addUserAsConfirmed(
    @Body() updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO,
  ) {
    return this.travelService.addUserAsConfirmed(updateUserAsConfirmedDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelService.remove(+id);
  }
}
