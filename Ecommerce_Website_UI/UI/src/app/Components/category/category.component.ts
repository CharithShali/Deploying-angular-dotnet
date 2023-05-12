import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import validatorform from '../../helper/validatorform';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  CategoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private catservice: CategoryService) {}
  ngOnInit(): void {
    this.CategoryForm = this.fb.group({
      category: [''],
      description: [''],
    });
  }

  onClick() {
    console.log(this.CategoryForm.value);
    this.catservice.addCategory(this.CategoryForm.value).subscribe({
      next: (res) => {
        alert(res.Message);
      },
      error: (err) => {
        alert(err?.err.Message);
      },
    });
  }

}
