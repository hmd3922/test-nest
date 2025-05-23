import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }

  async login(username: string, password: string): Promise<any | null> {
    console.log('Login attempt:', username, password); // 打印日志
    const user = await this.userModel.findOne({ username }).exec();
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username: user.username, sub: user._id };
      const token = this.jwtService.sign(payload);
      return {
        id: user._id,
        username: user.username,
        token: token
      };
    }
    console.log('Invalid credentials for user:', username); // 打印日志
    return null;
  }
}