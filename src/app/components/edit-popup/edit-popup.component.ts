import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog'
import { Product } from '../../../types';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating'


@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, FormsModule, RatingModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Input() header!: string;
  
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  }
  
  @Output() confirm = new EventEmitter<Product>();
  onConfirm() {
    this.confirm.emit(this.product)
  }

  onCancel() {
    this.display = false;
  }
}
