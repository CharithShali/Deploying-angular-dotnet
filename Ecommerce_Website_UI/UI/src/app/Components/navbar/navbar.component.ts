import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { cart } from 'src/app/models/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public user: any = [];
  public fullName: string = '';
  public role: string = '';
  public email: string = '';
  cart: cart[] = [];
  constructor(
    private api: AuthService,
    private userStore: UserStoreService,
    private cartServece: CartService,
    private router :Router,private toast:NgToastService
  ) {}
  ngOnInit() {
    this.api.getAllUsers().subscribe((res) => {
      this.user = res;
    });
    this.userStore.getfullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.api.getfullname();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getEmailFromStore().subscribe((val) => {
      let UserEmailFromToken = this.api.getUserEmail();
      this.email = val || UserEmailFromToken;
      console.log(this.email);
    });

    this.userStore.getRoleFromStore().subscribe((val) => {
      let roleFromToken = this.api.getRoleFromToken();
      this.role = val || roleFromToken;
      console.log(this.role);
    });

    this.api.getUser(this.email).subscribe((val) => {
      this.user = val;

      this.cartServece.getCartItems(this.user.userId).subscribe((val) => {
        this.cart = val;
      });
    });
  }
  logOut() {
    this.api.signOut();
    this.router.navigate(['/products'])
    .then(() => {
      window.location.reload();
      this.toast.success({detail:"Logged Out!",duration:5000});
    });

  }
}
