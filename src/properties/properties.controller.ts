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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
@ApiTags('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all properties' })
  @ApiResponse({
    status: 200,
    description: 'Properties returned successfully.',
  })
  findAllProperties(@Request() request: AuthenticatedRequest) {
    return this.propertiesService.findAllProperties(
      request.user.sub,
      request.user.role,
    );
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get a property by ID' })
  @ApiParam({ name: 'id', description: 'Property MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Property returned successfully.' })
  findPropertyById(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.propertiesService.findPropertyById(
      id,
      request.user.sub,
      request.user.role,
    );
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a property as an OWNER' })
  @ApiBody({ type: CreatePropertyDto })
  @ApiResponse({ status: 201, description: 'Property created successfully.' })
  @ApiResponse({ status: 401, description: 'JWT is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'OWNER role is required.' })
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
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a property status as an ADMIN' })
  @ApiParam({ name: 'id', description: 'Property MongoDB ObjectId' })
  @ApiBody({ type: UpdatePropertyStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Property status updated successfully.',
  })
  @ApiResponse({ status: 401, description: 'JWT is missing or invalid.' })
  @ApiResponse({ status: 403, description: 'ADMIN role is required.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a property' })
  @ApiParam({ name: 'id', description: 'Property MongoDB ObjectId' })
  @ApiResponse({ status: 200, description: 'Property deleted successfully.' })
  deleteProperty(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.propertiesService.deleteProperty(id, request.user.sub);
  }
}
