import { Controller, Get, Post, Param, Body, Logger, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Get()
    async findAll() {
        return await this .productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.productsService.findOne(id);
    }

    @Post()
    async create(@Body()productDto: ProductDto): Promise<any> {
        return await this.productsService.create(productDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() productDto: ProductDto){
        return await this.productsService.update(id, productDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.productsService.delete(id);
    }
}
