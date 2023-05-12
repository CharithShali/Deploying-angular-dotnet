import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';import { Route, Router } from '@angular/router';;
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { EditOrder, order } from 'src/app/models/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  order: order[] = [];
  public user: any = [];
  public fullName: string = '';
  public role: string = '';
  public email: string = '';

  editOrder: EditOrder = {
    orderid: 0,
    agentEmail: '',
    status: false,
  };

  displayedColumns: string[] = [
    'orderid',
    'amount',
    'status',
    'confirm'

  ];

  dataSource1 = new MatTableDataSource<order>(this.order);

  constructor(
    private orderservice: OrdersService,
    private api: AuthService,
    private userStore: UserStoreService,
    private dialog:MatDialog,
    private toast:NgToastService,
    private router :Router
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngOnInit() {
    this.dataSource1.paginator = this.paginator;

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
      console.log(this.user.userId);
    });

    if (this.role == 'seller') {
      this.orderservice.getAllOrders().subscribe((val) => {
        this.order = val;
        this.dataSource1.data = val;
        console.log(this.dataSource1.data);
      });
    }

  }
  accept(id: number) {
    this.editOrder.orderid = id;
    this.editOrder.agentEmail = this.user.email;
    this.editOrder.status = true;

    this.orderservice.updateOrder(this.editOrder).subscribe((val) => {
      console.log(val);
    });
    this.router.navigate(['/order'])
    .then(() => {
      window.location.reload();
      this.toast.success({detail:"Order Accepted",duration:5000});
    });
  }
  decline(id: number) {
if(confirm('Do You Want To Decline The Order?')){
    this.editOrder.orderid = id;
    this.editOrder.agentEmail = this.user.email;
    this.editOrder.status = false;

    this.orderservice.updateOrder(this.editOrder).subscribe((val) => {
      console.log(val);

    });
    this.router.navigate(['/order'])
    .then(() => {
      window.location.reload();
      this.toast.warning({detail:"Order Declied",duration:5000});
    });
  }
  }
}
