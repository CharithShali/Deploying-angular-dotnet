import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { Category, Products, User } from 'src/app/models/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  view: string = 'grid';
  products: Products[] = [];
  category: Category[] = [];
  enteredSearchValue:string='';
  nums = [1,1,1,1,1,1];
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
  public fullName: string = '';
  public role: string = '';
  public email: string = '';
  constructor(
    private productservice: ProductsService,
    private api: AuthService,
    private userStore: UserStoreService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.productservice.getAllProducts().subscribe({
      next: (product) => {
        this.products = product;
      },
    });
    console.log(this.products[0]);

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

    this.api.getUser(this.email).subscribe((val) => {
      this.user = val;

      console.log(this.user.userId);
    });

    this.categoryService.getAllCategories().subscribe({
      next: (cat) => {
        this.category = cat;
      },
      error: (err) => {
        alert(err?.err.Message);
      },
    });
    console.log(this.category);

  }
  @Output()
searchTextChanged:EventEmitter<string>=new EventEmitter<string>();

onSearchTextChange(keyword:any){
  this.searchTextChanged=keyword;
for(var i=0;i<this.products.length;i++){
if(!this.products[i].title.toLocaleLowerCase().includes(keyword)){
  this.products.pop;

}
}

}
}
