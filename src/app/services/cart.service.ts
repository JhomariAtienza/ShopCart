import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000';

  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private http: HttpClient) { }

  addToCart(userId: number, product: Product): Observable<any> {
    const url = `${this.apiUrl}/cart`;
    return this.http.post(url, { userId, product });
  }

  getCartItem(product: Product, userId: number): Observable<any> {
    const url = `${this.apiUrl}/cart?userId=${userId}&product.id=${product.id}`;
    return this.http.get(url);
  }

  removeCartItem(product: Product, userId: number): Observable<any> {
    return this.getCartItem(product, userId).pipe(
      map((cartItems: any[]) => cartItems[0]), // Map to get the first item
      switchMap((cartItem: any) => {
        const itemId = cartItem.id;
        const url = `${this.apiUrl}/cart/${itemId}?userId=${userId}`;
        return this.http.delete(url);
      })
    );
  }

  updateCartItemQuantity(product: Product, quantity: number): Observable<any> {
    const userId = 1;
    const url = `${this.apiUrl}/users/${userId}/cart/${product.id}`;
    return this.http.put(url, { quantity });
  }

  clearCart(userId: number): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}/cart`;
    return this.http.delete(url);
  }

  getCartItems(userId: number): Observable<any> {
    const url = `${this.apiUrl}/cart?userId=${userId}`;
    return this.http.get(url);
  }
}
