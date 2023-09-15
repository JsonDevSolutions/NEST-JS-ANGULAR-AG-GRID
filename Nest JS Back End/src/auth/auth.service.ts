import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from 'src/user/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new UnauthorizedException();

    // compare password
    const pwMatches = await argon.verify(user.password, data.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials');

    const { id, email, firstName, lastName, isAdmin } = user;
    const payload = { sub: id, email: email };
    return {
      message: 'Login Success',
      data: {
        access_token: await this.jwtService.signAsync(payload),
        id,
        email,
        firstName,
        lastName,
        isAdmin,
      },
      success: true,
      statusCode: 200,
    };
  }
}
