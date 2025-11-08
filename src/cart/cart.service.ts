import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const cartItem = this.repo.create({ userId, productId, quantity });
    return !!this.repo.save(cartItem);
  }

  getCart(userId: number) {
    return this.repo.find({ where: { userId } });
  }
}
