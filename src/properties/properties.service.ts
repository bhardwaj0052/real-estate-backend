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
  async findAllProperties(userId: string, role: string) {
    return role === 'ADMIN'
      ? this.propertyModel.find()
      : this.propertyModel.find({ ownerId: userId });
  }
  async findPropertyById(id: string, userId: string, role: string) {
    return role === 'ADMIN'
      ? this.propertyModel.findById(id)
      : this.propertyModel.findOne({ _id: id, ownerId: userId });
  }
  async createProperty(createPropertyDto: CreatePropertyDto, ownerId: string) {
    return this.propertyModel.create({ ...createPropertyDto, ownerId });
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
  async deleteProperty(id: string, ownerId: string) {
    return this.propertyModel.findOneAndDelete({ _id: id, ownerId });
  }
}
