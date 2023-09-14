import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiResponse } from 'src/api/api';
import { LoginDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // generate password hash
    const hash = await argon.hash(data.password);
    data.password = hash;
    // save new user in the db
    try {
      const user = await this.prisma.user.create({
        data,
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Something went wrong.');
        }
      }
      throw new ForbiddenException('Error');
    }
  }

  async login(data: LoginDto): Promise<ApiResponse<Response>> {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect Credentials');

    // compare password
    const pwMatches = await argon.verify(user.password, data.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials');

    return { message: 'Login Success', success: true, statusCode: 200 };
  }
}
