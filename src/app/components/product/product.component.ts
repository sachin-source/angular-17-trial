import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private confirmationService: ConfirmationService){
    confirmationService.confirm({
      message: 'Are you sure that you want to delete this product ?',
      accept: () => {
        this.deleteProduct();
      }
    })
  }

  editProduct(){
    this.edit.emit(this.product);
  }

  deleteProduct(){
    this.delete.emit(this.product);
  }

  ngOnInit() {
  }
}
