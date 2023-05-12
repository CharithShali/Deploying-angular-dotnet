import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { User, cart, order } from 'src/app/models/models';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public Quantity: number = 1;
  showProgressBar = false;

  displayedColumns: string[] = [
    'image',
    'name',
    'quantity',
    'price',
    'amount',
    'delete',
  ];

  public fullName: string = '';
  public role: string = '';
  public email: string = '';
  public total: number = 0;

  cart: cart[] = [];

  user: User = {
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

  order: order = {
    id: 0,
    userId: 0,
    agentEmail: '',
    status: 'Pending',
    amount: 0,
  };

  constructor(
    private api: AuthService,
    private userStore: UserStoreService,
    private cartServece: CartService,
    private _liveAnnouncer: LiveAnnouncer,
    private toast: NgToastService,
    private router: Router,
    private orderService: OrdersService
  ) {}
  dataSource = new MatTableDataSource<cart>();

  ngOnInit(): void {
    this.userStore.getEmailFromStore().subscribe((val) => {
      let UserEmailFromToken = this.api.getUserEmail();
      this.email = val || UserEmailFromToken;
      console.log(this.email);
    });

    this.api.getUser(this.email).subscribe((val) => {
      this.user = val;
      this.cartServece.getCartItems(this.user.userId).subscribe((val) => {
        this.cart = val;
        this.dataSource.data = this.cart;

        for (let i = 0; i < this.dataSource.data.length; i++) {
          this.total = this.total + this.dataSource.data[i].amount;
        }
      });
      console.log(this.user.userId);
      console.log(this.dataSource)
    });
  }
  onDelete(id: number) {
    this.cartServece.deleteCartItem(id).subscribe({
      next: (res) => {
        this.toast.warning({ detail: 'Deleted', duration: 5000 });
      },
    });
  }

  Order() {
    this.order.userId = this.user.userId;
    this.showProgressBar = true;
    this.order.amount = this.total;
    for (let i = 0; i < this.cart.length; i++) {
      this.cartServece.deleteCartItem(this.cart[i].cartitemid).subscribe({
        next: (res) => {
          this.toast.success({ detail: 'Processig', duration: 5000 });
        },
      });
    }

    this.orderService.addaOrder(this.order).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.toast.success({ detail: 'Success', duration: 5000 });
        }, 3000 );
        setTimeout(()=>{window.location.reload()}
      ,3000)


      },
      error: (err) => {
        alert(err?.err.Message);
      },
    });
  }
}
