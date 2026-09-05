import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.exists({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already has an account');
    }
    return await this.userModel.create(createUserDto);
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
