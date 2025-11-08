import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from './product.entity';

@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'Return all products' })
  getAll() {
    return this.productService.findAll();
  }

  @Post('create')
  @ApiBody({
    schema: { example: { name: 'Laptop', description: 'desscription about product', price: 10000, image: 'image_url' } },
  })
  @ApiResponse({ status: 201, description: 'Create a new product' })
  createProduct(@Body() body: Partial<Product>) {
    return this.productService.createProduct(body);
  }
}
