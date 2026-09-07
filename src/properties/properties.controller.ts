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

  // BUYER / PUBLIC
  @Get('approved')
  @ApiOperation({
    summary: 'Get all approved properties',
  })
  @ApiResponse({
    status: 200,
    description: 'Approved properties returned successfully.',
  })
  getApprovedProperties() {
    return this.propertiesService.findApprovedProperties();
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get properties based on user role',
  })
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

  // PUBLIC / BUYER
  @Get(':id')
  @ApiOperation({
    summary: 'Get an approved property by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Property MongoDB ObjectId',
  })
  @ApiResponse({
    status: 200,
    description: 'Property returned successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found.',
  })
  findPropertyById(@Param('id') id: string) {
    return this.propertiesService.findApprovedPropertyById(id);
  }

  // OWNER
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create a property as an OWNER',
  })
  @ApiBody({ type: CreatePropertyDto })
  @ApiResponse({
    status: 201,
    description: 'Property created successfully.',
  })
  createProperty(
    @Body() createPropertyDto: CreatePropertyDto,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.propertiesService.createProperty(
      createPropertyDto,
      request.user.sub,
    );
  }

  // ADMIN
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Approve or reject a property as ADMIN',
  })
  @ApiParam({
    name: 'id',
    description: 'Property MongoDB ObjectId',
  })
  @ApiBody({ type: UpdatePropertyStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Property status updated successfully.',
  })
  updatePropertyStatus(
    @Param('id') id: string,
    @Body() updatePropertyStatusDto: UpdatePropertyStatusDto,
  ) {
    return this.propertiesService.updatePropertyStatus(
      id,
      updatePropertyStatusDto,
    );
  }

  // OWNER
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete own property',
  })
  @ApiParam({
    name: 'id',
    description: 'Property MongoDB ObjectId',
  })
  deleteProperty(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.propertiesService.deleteProperty(id, request.user.sub);
  }
}
