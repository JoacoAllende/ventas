import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column("decimal", { precision: 5, scale: 2 })
  price: number;

  @Column("decimal", { precision: 2, scale: 2 })
  tasa: number;
}