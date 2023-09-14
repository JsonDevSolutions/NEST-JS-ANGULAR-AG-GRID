import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User as UserModel } from '@prisma/client';
import { LoginDto, UserDto } from './dto';
import { ApiResponse } from 'src/api/api';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() dto: UserDto): Promise<UserModel> {
    return this.userService.createUser(dto);
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() user: LoginDto): Promise<ApiResponse<Response>> {
    return this.userService.login(user);
  }
}
