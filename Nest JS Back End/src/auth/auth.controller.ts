import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() user: LoginDto) {
    return this.authService.login(user);
  }
}
