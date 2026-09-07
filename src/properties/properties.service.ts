import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Property } from './schemas/property.schema';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyStatusDto } from './dto/update-property-status.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private readonly propertyModel: Model<Property>,
  ) {}

  // ADMIN -> all properties
  // OWNER -> only own properties
  async findAllProperties(userId: string, role: string) {
    return role === 'ADMIN'
      ? this.propertyModel.find()
      : this.propertyModel.find({ ownerId: userId });
  }

  // Public/Buyer -> only approved properties
  async findApprovedProperties() {
    return this.propertyModel.find({ status: 'APPROVED' });
  }

  // Public/Buyer -> only approved property details
  async findApprovedPropertyById(id: string) {
    const property = await this.propertyModel.findOne({
      _id: id,
      status: 'APPROVED',
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async createProperty(createPropertyDto: CreatePropertyDto, ownerId: string) {
    return this.propertyModel.create({
      ...createPropertyDto,
      ownerId,
      status: 'PENDING',
    });
  }

  // ADMIN only
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

  // OWNER -> only own property can be deleted
  async deleteProperty(id: string, ownerId: string) {
    const property = await this.propertyModel.findOneAndDelete({
      _id: id,
      ownerId,
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }
}
