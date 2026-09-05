import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  ownerId!: string;

  @Prop({
    required: true,
    enum: ['DRAFT', 'PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  status!: string;

  @Prop({ type: [String], required: true })
  images!: string[];

  @Prop()
  publishedAt?: Date;

  @Prop()
  rejectionReason?: string;
}
export const PropertySchema = SchemaFactory.createForClass(Property);
