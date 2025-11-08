import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: { example: { email: 'test@gmail.com', password: '123456' } },
  })
  @ApiResponse({ status: 200, description: 'Return boolean' })
  @Post('register')
  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  @ApiBody({
    schema: { example: { email: 'test@gmail.com', password: '123456' } },
  })
  @ApiResponse({ status: 200, description: 'Return JWT token' })
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
