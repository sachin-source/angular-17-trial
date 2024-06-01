import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @ViewChild('deleteButton') deleteButton: any;
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private confirmationService: ConfirmationService){ }

  editProduct(){
    this.edit.emit(this.product);
  }

  confirmDelete(){
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement ,
      message: 'Are you sure that you want to delete this product ?',
      accept: () => {
        this.deleteProduct();
      }
    })
  }
  deleteProduct(){
    this.delete.emit(this.product);
  }

  truncateName(name:string){
    if(name.length > 16) {
      return name.slice(0,16) + "..."
    }
    return name;
  }
}
