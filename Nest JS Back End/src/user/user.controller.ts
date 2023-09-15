import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User as UserModel } from '@prisma/client';
import { UserDto } from './dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() dto: UserDto): Promise<UserModel> {
    return this.userService.createUser(dto);
  }
}
