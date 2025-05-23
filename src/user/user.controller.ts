import { Controller, Post, Body, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
      private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string) {
    try {
      const user = await this.userService.register(username, password);
      return {
        code: 200,
        data: {
          id: user._id,
          username: user.username
        },
        message: '注册成功'
      };
    } catch (error) {
      this.logger.error(`注册失败: ${error.message}`);
      throw new HttpException({
        code: HttpStatus.BAD_REQUEST,
        message: '注册失败，用户名可能已存在'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const result = await this.userService.login(username, password);
    if (result) {
      return {
        code: 200,
        id: result['id'],
        username: result['username'],
        token: result['token']
      };
    }
    return {
      code: 401,
      message: 'Invalid credentials'
    };
  }
}