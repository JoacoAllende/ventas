
import { PipeTransform, Pipe } from '@angular/core';
import { Product } from 'src/app/models/product';

@Pipe({
    name: 'codeFilter'
})
export class ProductFilterCodePipe implements PipeTransform {
    transform(products: Product[], searchCode: string): Product[] {
        if (!products || !searchCode) {
            return products;
        }
        return products.filter(product => product.code.indexOf(searchCode) !== -1);
    }
}
