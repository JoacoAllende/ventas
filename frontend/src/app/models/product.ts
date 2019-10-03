export class Product {

    constructor(id, descripction, code, price, rate){
            this.id = id;
            this.description = descripction;
            this.price = price;
            this.code = code;
            this.rate = rate;
    }

    id: number;
    code: string;
    description: string;
    price: number;
    rate: number;

}