import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SavedProperty } from './schemas/saved-property.schema';

@Injectable()
export class SavedPropertiesService {
  constructor(
    @InjectModel(SavedProperty.name)
    private readonly savedPropertyModel: Model<SavedProperty>,
  ) {}

  async saveProperty(userId: string, propertyId: string) {
    return this.savedPropertyModel.create({
      userId,
      propertyId,
    });
  }

  async getSavedProperties(userId: string) {
    return this.savedPropertyModel.find({ userId });
  }

  async removeSavedProperty(userId: string, propertyId: string) {
    return this.savedPropertyModel.findOneAndDelete({
      userId,
      propertyId,
    });
  }
}
