import { Schema, Document } from 'mongoose';
import { Prop, SchemaFactory, Schema as MongooseSchema } from '@nestjs/mongoose';

@MongooseSchema()
export class Item extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);