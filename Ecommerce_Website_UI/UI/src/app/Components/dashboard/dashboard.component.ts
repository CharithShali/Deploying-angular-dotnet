import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public user:any=[];
constructor(private api:AuthService) {}
  ngOnInit(){
    this.api.getAllUsers().subscribe(res=>{
      this.user=res;
    })
  }

  logOut(){
    this.api.signOut();
  }
}
