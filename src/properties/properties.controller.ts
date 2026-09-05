import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  @Get()
  findAllProperties() {
    return this.propertiesService.findAllProperties();
  }
  @Get(':id')
  findPropertyById(@Param('id') id: string) {
    return this.propertiesService.findPropertyById(id);
  }
  @Post()
  createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.createProperty(createPropertyDto);
  }
  @Patch(':id/status')
  updatePropertyStatus(
    @Param('id') id: string,
    @Body() updatePropertyStatusDto: UpdatePropertyStatusDto,
  ) {
    return this.propertiesService.updatePropertyStatus(
      id,
      updatePropertyStatusDto,
    );
  }
  @Delete(':id')
  deleteProperty(@Param('id') id: string) {
    return this.propertiesService.deleteProperty(id);
  }
}
