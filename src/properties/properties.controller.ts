import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

type AuthenticatedRequest = ExpressRequest & {
  user: {
    sub: string;
    role: string;
  };
};

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.propertiesService.createProperty(
      createPropertyDto,
      request.user.sub,
    );
  }
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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
