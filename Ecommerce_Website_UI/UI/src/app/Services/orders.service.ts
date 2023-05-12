import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditOrder, order } from '../models/models';
import { Order } from 'sequelize/types';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl: string = "https://localhost:44325/api/Order/"

  constructor(private httpClient: HttpClient) {}
  addaOrder(orderObj:any){
    return this.httpClient.post<any>(`${this.baseUrl}addOrder`,orderObj)
  }
  getAllOrders(){
    return this.httpClient.get<order[]>(`${this.baseUrl}`)
  }
  updateOrder(order:EditOrder){
    return this.httpClient.put(`${this.baseUrl}`,order)

  }


}
