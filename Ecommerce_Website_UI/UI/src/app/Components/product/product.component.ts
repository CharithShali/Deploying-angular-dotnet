import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import * as Q from 'q';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { Cart, CartItem, Products, User } from 'src/app/models/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public fullName: string = '';
  public role: string = '';
  public email: string = '';
  public id: number = 0;
  public Quantity: number = 1;

  @Input() view: 'grid' | 'list' = 'grid';

  @Input() user: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: 0,
    password: '',
    createdAt: '',
    role: '',
    token: '',
  };
  @Input() keyword: string='';
  @Input() product: Products = {
    productId: 0,
    title: '',

    description: '',

    categoryId: 0,

    price: 0,

    quantity: 0,

    imageName: '',

    userId: 0,
  };

  cart: Cart = {
    CartId: 0,
    UserId: 0,
    Ordered: '',
    OrderedOn: '',
  };

  cartItem: CartItem = {
    CartItemId: 0,
    CartId: 0,
    ProductId: 0,
    Quantity: 0,
  };

  constructor(
    private api: AuthService,
    private userStore: UserStoreService,
    private cartService: CartService,
    public router: Router,
    private toast: NgToastService,
  ) {this.router.routeReuseStrategy.shouldReuseRoute = () => { this.ngOnInit();
    return false;
  };}
  ngOnInit(): void {
    this.userStore.getfullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.api.getfullname();
      this.fullName = val || fullNameFromToken;
      console.log('22222');
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.api.getRoleFromToken();
      this.role = val || roleFromToken;
      console.log(this.role);
    });
    this.userStore.getEmailFromStore().subscribe((val) => {
      let UserEmailFromToken = this.api.getUserEmail();
      this.email = val || UserEmailFromToken;
      console.log(this.email);
    });

  }

  addCart(id: any, uid: any) {
    this.cart.Ordered = '';
    this.cart.OrderedOn = '';
    this.cart.UserId = uid;
    console.log('Cart', this.cart);

    this.cartItem.ProductId = id;


    this.cartService.AddACart(this.cart).subscribe({
      next: (response: any) => {
        console.log(response);

        this.cartItem.CartId = response;
        this.cartItem.Quantity = this.Quantity;
        this.cartService
          .AddItemToCart(this.cartItem, this.user.userId)
          .subscribe({
            next: (res) => {
              this.toast.success({ detail: 'Item Added', duration: 5000 });
              console.log('cart item added');
            },
          });

      },
    });

    this.router.navigateByUrl('/products');
  }

  minus() {
    if (this.Quantity > 1) {
      this.Quantity = this.Quantity - 1;
    } else {
      this.Quantity = 1;
    }
  }
  plus() {
    this.Quantity = this.Quantity + 1;
    console.log(this.Quantity);
  }

}
