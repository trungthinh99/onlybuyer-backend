import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: { example: { email: 'test@gmail.com', password: '123456' } },
  })
  @ApiResponse({ status: 201, description: 'Return boolean' })
  @Post('register')
  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  @ApiBody({
    schema: { example: { email: 'test@gmail.com', password: '123456' } },
  })
  @ApiResponse({ status: 200, description: 'Return access token and user id' })
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
