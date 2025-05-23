import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createItem(item: Item): Promise<Item> {
    const createdItem = new this.itemModel(item);
    return createdItem.save();
  }

  async getItems(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async updateItem(id: string, item: Item): Promise<Item> {
  const updatedItem = await this.itemModel.findByIdAndUpdate(id, item, { new: true }).exec();
  if (!updatedItem) {
    throw new NotFoundException('Item not found');
  }
  return updatedItem;
}

  async deleteItem(id: string): Promise<boolean> {
    const result = await this.itemModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}