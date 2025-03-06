import { Component } from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {Button} from "primeng/button";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    AsyncPipe,
    Button
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems$ = this.cartService.cartItems$;

  constructor(private cartService: CartService) {}

  removeItem(productId: number) {
    this.cartService.decrementQuantity(productId);
  }

}
