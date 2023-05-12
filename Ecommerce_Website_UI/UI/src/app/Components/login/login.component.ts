import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import validatorfrom from './../../helper/validatorform'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;

constructor(private fb:FormBuilder,private auth:AuthService,private router :Router,private toast:NgToastService) {

}
ngOnInit():void{
  this.loginForm=this.fb.group({
    email:['',Validators.required],
password:['',Validators.required]
  })
}

hideShowPass(){
  this.isText=!this.isText;
  this.isText? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
  this.isText ? this.type="text":this.type="pasword";
}
onLogin(){
  if(this.loginForm.valid){
    console.log(this.loginForm.value)
this.auth.Login(this.loginForm.value)
.subscribe({
  next:(res)=>{

    this.loginForm.reset();
    this.auth.storeToken(res.token)
    this.router.navigate(['/products'])
    .then(() => {
      window.location.reload();
      this.toast.success({detail:"Success",summary:res.message,duration:5000});
    });

  },
  error:(err)=>{
    this.toast.error({detail:"Error",summary:err.error.message,duration:5000});
  }
})

  }
  else{

    validatorfrom.validateFormField(this.loginForm)
    alert("Form is invalid")
  }

}


}
