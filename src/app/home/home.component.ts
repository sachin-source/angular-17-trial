import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { PaginatorModule } from 'primeng/paginator'
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  displayEditPopup:boolean = false;
  displayAddPopup:boolean = false;

  toggleEditPopup(product: Product){
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product){
    
  }
  toggleAddPopup(){
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0
  }

  onConfirmEdit(product: Product){
    if(!this.selectedProduct.id){
      return;
    }
    this.editProduct(product, this.selectedProduct.id)
    this.displayEditPopup = false;
  }

  onConfirmAdd(product:Product){
    this.addProduct(product)
    this.displayAddPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts('http://localhost:3000/clothes', { page, perPage }).subscribe({
      next: (products: Products) => {
        this.products = products.items;
        this.totalRecords = products.total;
      },
      error: (error) => console.log(error)
    })
  }


  editProduct(product: Product, id: number) {
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  addProduct(product: Product) {
    this.productsService.addProduct(`http://localhost:3000/clothes`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  deleteProduct(id: number){
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}` ).subscribe({
      next: (data) => {
        console.log(data)
        this.fetchProducts(0, this.rows);
      },
      error: (data) => {
        console.log(data)
      }
    })
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
  onProductOutput(product: Product) {
    console.log(product)
  }
}
