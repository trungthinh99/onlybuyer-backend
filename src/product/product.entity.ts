import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from '../cart/cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];
}
