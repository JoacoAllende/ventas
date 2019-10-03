import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //PRODUCTS
  public productsObs: Observable<Product[]>;
  public products: Product[] = [];
  //PAGINACIÓN
  actualPage : number = 1;
  //ORDEN
  order: string = 'description';
  reverse: boolean = false;
  //ELEMENTOS DEL COMPONENTE
  edition = false;
  initial = true;
  search = false;
  //FILTRO PIPE
  searchCode: string;
  searchDescription: string;

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productsObs = this.productService.getProducts();
    this.productsObs.subscribe(prod => this.products = prod);
    this.getProducts();
  }

  // DISTINTOS ÓRDENES

  setOrder(value: string) {
    console.log('entro');
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  // ALTA, BAJA Y MODIFICACIÓN DE PRODUCTS

  getProducts(){
    this.productService.getProducts()
      .subscribe(res => {
        this.productService.products = res as Product[]; 
      })
  }

  editProduct(product: Product){
    this.productService.selectedProduct = new Product(product.id, product.description, product.code, product.price, product.rate);
  }

  addProduct(form : NgForm){
    if (form.value.id == null){
      this.productService.postProduct(form.value)
      .subscribe(res => {
        this.resetForm(form);
        if (res == 1062) {
          alert('No pudo crearse el producto. Ya existía un producto con el código ingresado.')
        } else {
          this.productsObs.subscribe(prod => this.products = prod);
        }
      })
    }
    else {
      this.productService.putProduct(form.value)
      .subscribe(res => {
        this.resetForm(form);
        if (res == 1062) {
          alert('No pudo actualizarse el producto. Ya existía un producto con el código ingresado.')
        } else {
          this.productsObs.subscribe(prod => this.products = prod);
        }
      })
    }
  }

  deleteProduct(id : number){
    if (confirm('Desea eliminar el producto?')){
      this.productService.deleteProduct(id)
      .subscribe(res => {
        this.productsObs.subscribe(prod => this.products = prod);
      })
    }
  }
  
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }

  CheckValidation(fo : NgForm){
    var form = document.forms["productForm"];
    for (let i = 0; i < form.length; i++){
      if(form[i].type != 'hidden' && form[i].tagName == 'INPUT') 
        if (form[i].value == '') {
          alert('Debe completarse el campo ' + form[i].name);
          return;
        } else if (form[i].name === 'precio' && form[i].value < 0) {
          alert('No puede ingresarse valores negativos para el precio');
          return;
        }
    }
    this.addProduct(fo);
   }

   // HABILITAR DIFERENTES ELEMENTOS DEL COMPONENTE

   enableEdition(){
     this.edition = true;
     this.initial = false;
   }

   enableInitial(){
    this.edition = false;
    this.search = false;
    this.initial = true;
    this.productsObs.subscribe(prod => this.products = prod);
    this.searchCode = '';
    this.searchDescription = '';
   }

   enableSearch(){
     this.search = true;
     this.initial = false;
   }

}