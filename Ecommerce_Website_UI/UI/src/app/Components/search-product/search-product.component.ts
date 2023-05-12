import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { Products, Category, User } from 'src/app/models/models';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit{
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
  searchName: string ='';


  constructor(
    private productservice: ProductsService,
    private api: AuthService,
    private userStore: UserStoreService,
    private categoryService: CategoryService,private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.searchName = params['name'];
    });
console.log(this.searchName)
    this.productservice.searchProductByName(this.searchName).subscribe({
      next: (product) => {
        console.log(product)
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

}
