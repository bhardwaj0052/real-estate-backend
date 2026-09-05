import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user.passwordHash !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // return {
    //   message: 'login successfull',
    //   user: {
    //     id: user?._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    // };
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
