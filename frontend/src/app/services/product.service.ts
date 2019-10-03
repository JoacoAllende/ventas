import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];
  selectedProduct: Product;

  constructor(private http: HttpClient) {
    this.products = [];
    this.selectedProduct = new Product(null, "", "", null, null);
  }

  postProduct(product: Product) {
    return this.http.post(`http://localhost:3000/products`, product);
  }

  putProduct(product: Product) {
    return this.http.put(`http://localhost:3000/products/` + product.id, product);
  }

  getProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products`)
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/` + id);
  }

}
