import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { Category } from 'src/app/models/models';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  ProductForm!: FormGroup;
  category: Category[] = [];
  selectedCategory: string = '';
  logoPreviewPath!: string;
  imageSelected: boolean = false;
  href: string = '';
  public fullName: string = '';
  public role: string = '';
  public email: string = '';
  public total: number = 0;
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
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productservice: ProductsService,
    private api: AuthService,
    private userStore: UserStoreService,
    private toast: NgToastService,
    private router :Router
  ) {}
  ngOnInit(): void {
    this.ProductForm = this.fb.group({
      title: [''],
      category: [''],
      description: [''],
      quantity: [''],
      price: [''],
      imagename: [''],
      userId: [],
      categoryId: [],
    });

    this.userStore.getEmailFromStore().subscribe((val) => {
      let UserEmailFromToken = this.api.getUserEmail();
      this.email = val || UserEmailFromToken;
      console.log(this.email);
    });

    this.api.getUser(this.email).subscribe((val) => {
      this.user = val;
      console.log(this.user);
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

  onClick() {
    let categ = this.category.find(
      (i) => i.category === this.ProductForm.value.category
    );
    console.log(categ?.categoryId);
    this.ProductForm.value.categoryId = categ?.categoryId;

    delete this.ProductForm.value.category;
    console.log(this.ProductForm.value.imagenames);
    this.href = this.ProductForm.value.imagename;

    this.ProductForm.value.imagename = this.href.split('\\')[2];
    this.ProductForm.value.userId = this.user.userId;

    console.log(this.ProductForm.value);
    this.productservice.addProduct(this.ProductForm.value).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Success',
          summary: res.message,
          duration: 5000,
        });
        this.router.navigate(['/products'])
      },
      error: (err) => {
        alert(err?.err.Message);
      },
    });
  }
}
