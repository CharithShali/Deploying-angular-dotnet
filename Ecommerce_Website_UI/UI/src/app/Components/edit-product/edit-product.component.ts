import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { Category, Products, User } from 'src/app/models/models';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  ProductForm!: FormGroup;
  category: Category[] = [];

product:Products={
  productId: 0,
  title: '',
  description: '',
  categoryId: 0,
  price: 0,
  quantity: 0,
  imageName: '',
  userId: 0
}
id:number=0;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productservice: ProductsService,
    private api: AuthService,
    private userStore: UserStoreService,
    private toast:NgToastService,
    private route: ActivatedRoute,
    private rout :Router
  ) {}

  ngOnInit(): void {

    this.ProductForm = this.fb.group({
      title:[],
      category: [],
      description: [],
      quantity: [],
      price: [],
      imagename: [],
      userId: [],
      categoryId: [],
    });

    this.id = this.route.snapshot.params['id'];
    this.productservice.getAllProduct(this.id).subscribe({
      next: (cat) => {
       this.product=cat;
       console.log(this.product)
    this.ProductForm.controls['title'].setValue(this.product.title)
    this.ProductForm.controls['description'].setValue(this.product.description)
    this.ProductForm.controls['price'].setValue(this.product.price)
    this.ProductForm.controls['quantity'].setValue(this.product.quantity)
    this.ProductForm.controls['userId'].setValue(this.product.userId)
      },
      error: (err) => {
        alert(err?.err.Message);
      },
    });
    console.log("ddddd" ,this.product)


    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.category=res;
      },
      error: (err) => {
        alert(err?.err.Message);
      },
    });

  }
  onClick(){

    let categ = this.category.find(
      (i) => i.category === this.ProductForm.value.category
    );
    this.ProductForm.value.categoryId = categ?.categoryId;
    this.ProductForm.value.imagename=this.product.imageName;
    delete this.ProductForm.value.category;
  console.log(this.ProductForm.value)
    this.productservice.updateproduct(this.id,this.ProductForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.rout.navigate(['/products'])
      },
      error: (err) => {
        alert(err?.err.Message);
      },
    });

  }

  }
