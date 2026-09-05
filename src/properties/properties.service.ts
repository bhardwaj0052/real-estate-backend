import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './schemas/property.schema';
import { Model } from 'mongoose';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private readonly propertyModel: Model<Property>,
  ) {}
  async findAllProperties() {
    return this.propertyModel.find();
  }
  async findPropertyById(id: string) {
    return this.propertyModel.findById(id);
  }
  async createProperty(createPropertyDto: CreatePropertyDto) {
    return this.propertyModel.create(createPropertyDto);
  }
  async updatePropertyStatus(
    id: string,
    updatePropertyStatusDto: UpdatePropertyStatusDto,
  ) {
    const property = await this.propertyModel.findById(id);
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    property.status = updatePropertyStatusDto.status;
    if (updatePropertyStatusDto.status === 'APPROVED') {
      property.publishedAt = new Date();
      property.rejectionReason = undefined;
    }
    if (updatePropertyStatusDto.status === 'REJECTED') {
      property.rejectionReason = updatePropertyStatusDto.rejectionReason;
      property.publishedAt = undefined;
    }
    return property.save();
  }
  async deleteProperty(id: string) {
    return this.propertyModel.findByIdAndDelete(id);
  }
}
