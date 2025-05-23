import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './item.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('create')
  async createItem(@Body() item: Item) {
    try {
      const result = await this.appService.createItem(item);
      return {
        code: 200,
        data: result,
        message: '创建成功'
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '创建失败'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('read')
  async getItems() {
    try {
      const result = await this.appService.getItems();
      return {
        code: 200,
        data: result,
        message: '查询成功'
      };
    } catch (error) {
      throw new HttpException({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '查询失败'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('update')
  async updateItem(@Body() payload: { id: string; item: Item }) {
    try {
      const { id, item } = payload;
      const result = await this.appService.updateItem(id, item);
      return {
        code: 200,
        data: result,
        message: '更新成功'
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException({
          code: HttpStatus.NOT_FOUND,
          message: '项目不存在'
        }, HttpStatus.NOT_FOUND);
      }
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '更新失败'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('delete/:id')
  async deleteItem(@Param('id') id: string) {
    try {
      const result = await this.appService.deleteItem(id);
      if (!result) {
        throw new HttpException({
          code: HttpStatus.NOT_FOUND,
          message: '项目不存在'
        }, HttpStatus.NOT_FOUND);
      }
      return {
        code: 200,
        data: true,
        message: '删除成功'
      };
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '删除失败'
      }, HttpStatus.BAD_REQUEST);
    }
  }
}