import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    try {
      const existing = await this.repo.findOne({
        where: { userId, productId },
      });

      if (existing) {
        existing.quantity += quantity;
        await this.repo.save(existing);
        return true;
      }

      const newItem = this.repo.create({ userId, productId, quantity });
      await this.repo.save(newItem);
      return true;
    } catch (error) {
      return { result: false, message: error.message };
    }
  }

  getCart(userId: number) {
    return this.repo.find({ where: { userId } });
  }
}
