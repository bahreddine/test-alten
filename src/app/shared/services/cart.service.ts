import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Product} from "../../products/data-access/product.model";

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product, quantity: number = 1) {
    const current = this.cartItems.value;
    const existing = current.find(item => item.id === product.id);

    existing ? existing.quantity += quantity :
      current.push({...product, quantity});
    this.cartItems.next(current);
  }

  removeFromCart(productId: number) {
    this.cartItems.next(
      this.cartItems.value.filter(item => item.id !== productId)
    );
  }

  decrementQuantity(productId: number) {
    const updatedItems = this.cartItems.value
      .map(item => {
        if (item.id === productId) {
          return { ...item, quantity: Math.max(0, item.quantity - 1) };
        }
        return item;
      })
      .filter(item => item.quantity > 0); // Supprime si quantité <= 0

    this.cartItems.next(updatedItems);
  }
}
