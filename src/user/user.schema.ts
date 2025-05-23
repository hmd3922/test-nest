import { Schema, Document } from 'mongoose';
import { Prop, SchemaFactory, Schema as MongooseSchema } from '@nestjs/mongoose';

@MongooseSchema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);