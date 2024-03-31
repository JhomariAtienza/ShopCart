import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/CartItem';
import { Product } from '../../../models/Product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  userId: number | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = Number(params['userId']);
      if (!isNaN(this.userId)) {
        this.getCartItems();
      } else {
        console.error('Invalid userId provided');
      }
    });
  }

  getCartItems(): void {
    if (this.userId !== null) {
      this.cartService.getCartItems(this.userId).subscribe(cartItems => {
        this.cartItems = cartItems;
        this.totalPrice = this.cartItems.reduce((total, item) => total + item.product.price * item.product.quantity, 0);
      });
    } else {
      console.error('User ID is null');
    }
  }

  removeCartItem(product: Product): void {
    if (this.userId !== null) {
      this.cartService.removeCartItem(product, this.userId).subscribe(() => {
        const index = this.cartItems.findIndex(item => item.product.id === product.id);
        if (index !== -1) {
          const removedItem = this.cartItems.splice(index, 1)[0];
          this.totalPrice -= removedItem.product.price * removedItem.product.quantity; // Update total price
        }
      }, error => {
        console.error('Error removing cart item:', error);
      });
    } else {
      console.error('User ID is null');
    }
  }
  

  clearCart(): void {
    if (this.userId !== null) {
      this.cartService.clearCart(this.userId).subscribe(() => {
        this.cartItems = [];
        this.totalPrice = 0;
      }, error => {
        console.error('Error clearing cart:', error);
      });
    } else {
      console.error('User ID is null');
    }
  }

  checkout(): void {
    console.log('Checkout button clicked');
  }
}