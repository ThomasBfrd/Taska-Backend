import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async getUser(
    email: string,
  ): Promise<{ id: string; email: string; password: string }> {
    const user = await this.userModel.findOne({ email: email }).lean();

    if (!user) throw new NotFoundException('User not found in database');

    return {
      id: user._id.toString(),
      email: user.email,
      password: user.password,
    };
  }
}
