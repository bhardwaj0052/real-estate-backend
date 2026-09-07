import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class SavedProperty {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  propertyId!: string;
}

export const SavedPropertySchema = SchemaFactory.createForClass(SavedProperty);
