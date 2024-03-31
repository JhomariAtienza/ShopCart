// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { LoginComponent } from '../../auth/login/login.component';
import { Product } from '../../models/Product';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  username: string = '';
  userId: number = 0;

  categoryOptions: any[] = [];
  priceRange: number[] = [0, 1000];
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProducts();
    const usernameQueryParam =
      this.route.snapshot.queryParamMap.get('username');
    this.username = usernameQueryParam !== null ? usernameQueryParam : 'Guest';
    this.username = this.username as string;
    this.getUserId();
    }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;

      const categoriesSet = new Set<string>();
      products.forEach((product) => {
        if (product.category) {
          categoriesSet.add(product.category);
        }
      });
      this.categories = Array.from(categoriesSet);
      this.categoryOptions = this.categories.map((category) => ({
        label: category,
        value: category,
      }));
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      let categoryMatch = true;
      let priceMatch = true;

      if (this.selectedCategory && this.selectedCategory !== 'All') {
        categoryMatch = product.category === this.selectedCategory;
      }

      if (this.minPrice && this.maxPrice) {
        priceMatch =
          product.price >= this.minPrice && product.price <= this.maxPrice;
      }

      return categoryMatch && priceMatch;
    });
  }

  sortByName(): void {
    this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  getUserId(): void {
    const username = this.username;
    this.userService.getUserByuserName(username).subscribe((response) => {
      if (Array.isArray(response) && response.length > 0) {
        const user = response[0]; 
         this.userId = user.id;
        console.log('GetId', user);
        this.userService.setUserId(this.userId);
      } else {
        console.log('User not found');
      }
    });
  }
  

  addToCart(product: Product): void {
    if (!product.quantity) {
      product.quantity = 1; // Set default quantity to 1
    };
    this.getUserId();
    this.cartService.addToCart(this.userId, product).subscribe((response) => {
      console.log('Product added to cart:', response);
    });
  }
  

  getCartItems(): void {
    const userId = 1; // Assuming userId is hardcoded for demo purposes
    this.cartService.getCartItems(userId).subscribe((response) => {
      console.log(response);
      // this.cartItems = cartItems;
    });
  }
  checkout(): void {
    this.router.navigate(['/cart'], { queryParams: { userId: this.userId } }); // Navigate to the cart dashboard route
  }
}
