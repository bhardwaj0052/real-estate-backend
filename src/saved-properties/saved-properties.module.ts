import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SavedProperty,
  SavedPropertySchema,
} from './schemas/saved-property.schema';

import { SavedPropertiesService } from './saved-properties.service';
import { SavedPropertiesController } from './saved-properties.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SavedProperty.name,
        schema: SavedPropertySchema,
      },
    ]),
  ],
  controllers: [SavedPropertiesController],
  providers: [SavedPropertiesService],
})
export class SavedPropertiesModule {}
