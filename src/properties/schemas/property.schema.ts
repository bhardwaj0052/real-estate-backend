import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  ownerId!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  city!: string;

  @Prop({ required: true })
  area!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  lat!: number;

  @Prop({ required: true })
  lng!: number;

  @Prop({ required: true })
  propertyType!: string;

  @Prop()
  bhk?: number;

  @Prop({ required: true })
  sqft!: number;

  @Prop({ required: true })
  price!: number;

  @Prop({ type: [String], default: [] })
  amenities!: string[];

  @Prop({ type: [String], default: [] })
  images!: string[];

  @Prop({
    required: true,
    enum: ['DRAFT', 'PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  status!: string;

  @Prop()
  publishedAt?: Date;

  @Prop()
  rejectionReason?: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
