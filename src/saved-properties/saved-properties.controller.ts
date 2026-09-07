import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { SavedPropertiesService } from './saved-properties.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('saved-properties')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('BUYER')
export class SavedPropertiesController {
  constructor(
    private readonly savedPropertiesService: SavedPropertiesService,
  ) {}

  @Post(':propertyId')
  saveProperty(
    @Param('propertyId') propertyId: string,
    @Request() request: any,
  ) {
    return this.savedPropertiesService.saveProperty(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      request.user.sub,
      propertyId,
    );
  }

  @Get()
  getSavedProperties(@Request() request: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.savedPropertiesService.getSavedProperties(request.user.sub);
  }

  @Delete(':propertyId')
  removeSavedProperty(
    @Param('propertyId') propertyId: string,
    @Request() request: any,
  ) {
    return this.savedPropertiesService.removeSavedProperty(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      request.user.sub,
      propertyId,
    );
  }
}
