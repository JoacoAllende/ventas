import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { ProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    // private readonly products: Observable<P>[] = [];

    constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) { }

    async create(prod) {
        const product = await this.productRepository.create(prod);
        await this.productRepository.save(product);
        return product;
    }

    async findAll() {
        return await this.productRepository.find();
    }

    async update(id: number, prod: Partial<ProductDto>) {
        let product = await this.productRepository.findOne({ where: { id } })
        await this.productRepository.update({ id }, prod);
        return product;
    }

    async findOne(id: number) {
        let product = await this.productRepository.findOne({where: {id}})
        return product;
    }

    async delete(id: number){
        let product = await this.productRepository.findOne({where: {id}})
        await this.productRepository.delete({id});
        return product;
    }
}
