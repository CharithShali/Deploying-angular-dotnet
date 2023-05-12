import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { Cart, CartItem, Products, User } from 'src/app/models/models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public Quantity:number = 1;
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

  product: Products ={
    productId: 0,
  title: '',

  description: '',

  categoryId: 0,

  price: 0,

  quantity: 0,

  imageName: '',

  userId: 0
  };
  href:string='';
  public fullName: string = '';
  public role: string = '';
  public email: string = '';
  public id: number = 0;
  cart: Cart = {
    CartId: 0,
    UserId: 0,
    Ordered: '',
    OrderedOn: '',
  };

  cartItem:CartItem={
    CartItemId: 0,
    CartId: 0,
    ProductId: 0,
    Quantity: 0
  }
constructor(private route: ActivatedRoute,
  private productservice:ProductsService,
  private userStore: UserStoreService,
  private api: AuthService,
  private cartService: CartService
  ) {

}


  ngOnInit(): void {
  const id = this.route.snapshot.params['id'];
  console.log(id);

  this.productservice.getAllProduct(id)
    .subscribe({
      next:(product:any)=>{
        this.product=product;
        console.log(this.product)

      }
    })

    this.userStore.getfullNameFromStore().subscribe((val) => {
      let fullNameFromToken = this.api.getfullname();
      this.fullName = val || fullNameFromToken;
      console.log('22222');
    });

  }

  addCart(id:any,uid:any){
    this.cart.Ordered="";
    this.cart.OrderedOn="";
    this.cart.UserId=uid;
    console.log("Cart",this.cart)

    this.cartItem.ProductId=id;
    this.cartItem.Quantity=this.Quantity;

    this.cartService.AddACart(this.cart).subscribe({
      next:(response:any)=>{

        console.log(response)

  this.cartItem.CartId=response;
  this.cartService.AddItemToCart(this.cartItem,this.user.userId).subscribe({
    next:(res=>{
      console.log("cart item added")
    })
  })

      }
    })

  }

  minus(){
    if(this.Quantity>1){
    this.Quantity=this.Quantity-1;}
    else{
      this.Quantity=1;
    }
  }
  plus(){
    this.Quantity=this.Quantity+1;
    console.log(this.Quantity)
  }
}
