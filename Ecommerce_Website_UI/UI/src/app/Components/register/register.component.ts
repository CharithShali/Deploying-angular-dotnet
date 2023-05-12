import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import validatorform from '../../helper/validatorform';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  SignUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.SignUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSignup() {
    if (this.validateEmail(this.SignUpForm.value.email)) {
      if (this.validateMobileNumber(this.SignUpForm.value.mobile)) {
        if (this.SignUpForm.valid) {
          console.log(this.SignUpForm.value);
          this.auth.signUp(this.SignUpForm.value).subscribe({
            next: (res) => {
              this.router.navigate(['/login']).then(() => {
                this.toast.success({
                  detail: 'Success',
                  summary: res.message,
                  duration: 5000,
                });
              });
            },
            error: (err) => {
              alert(err?.err.message);
            },
          });
        } else {
          validatorform.validateFormField(this.SignUpForm);
        }
      } else {
        alert('Enter Valid Mobile Number');
      }
    } else {
      alert('Enter Valid email');
    }
  }

  validateMobileNumber(mobileNumber: string): boolean {
    const re = /^(?:\+94|0)(?:7[0125678])(?:\d{7})$/;
    return re.test(mobileNumber);
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(re.test(email));
    return re.test(email);
  }
}
