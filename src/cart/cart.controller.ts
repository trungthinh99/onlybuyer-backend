import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('add')
  @ApiBody({
    schema: { example: { productId: 1, quantity: 10 } },
  })
  @ApiResponse({ status: 201, description: 'Add product to cart' })
  addToCart(
    @Req() req: any,
    @Body() body: { productId: number; quantity: number },
  ) {
    const { productId, quantity } = body;
    const userId = req.user.userId;
    
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'Get my cart' })
  getCart(@Req() req: any) {
    const userId = req.user.userId;
    return this.cartService.getCart(userId);
  }
}
