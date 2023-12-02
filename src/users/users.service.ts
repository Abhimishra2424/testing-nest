import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Note } from 'src/note/note.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    return this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      age: createUserDto.age,
      email: createUserDto.email,
      password: hashPassword,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({
      include: [Note], // Include the Note model
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
      include: [Note], // Include the Note model
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    } else {
      return user;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (user) {
      await this.userModel.update(updateUserDto, { where: { id } });
      return await this.findOne(id);
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userModel.findByPk(id);
  }
}
