// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'; 
import { CartService } from '../../../services/cart.service'; // Import CartService
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService // Inject CartService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Method to add product to cart
  addToCart(product: Product) {
    const userId = 1; // Assuming you have the user ID
    const quantity = 1; // You can adjust the quantity as needed
    // Call the addToCart method of CartService with userId, product, and quantity arguments
    this.cartService.addToCart(userId, product).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
