 
import { PipeTransform, Pipe } from '@angular/core';
import { Product } from 'src/app/models/product';

@Pipe({
    name: 'descriptionFilter'
})
export class ProductFilterDescriptionPipe implements PipeTransform {
    transform(products: Product[], searchDescription: string): Product[] {
        if (!products || !searchDescription) {
            return products;
        }
        return products.filter(product => product.description.toLocaleLowerCase().indexOf(searchDescription.toLowerCase()) !== -1);
    }
}