import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})


export class ProductsService {
  private baseUrl: string = "https://localhost:44325/api/Product/"
  constructor(private httpClient: HttpClient) {}
  addProduct(proObj:Products){
    return this.httpClient.post<any>(`${this.baseUrl}addproduct`,proObj)
  }
  getAllProducts(){
    return this.httpClient.get<Products[]>(`${this.baseUrl}`)

  }
  getAllProduct(id:any){
    console.log("https://localhost:44325/api/Product/"+id)
    return this.httpClient.get<Products>(`${this.baseUrl}`+id)

  }
  updateproduct(id:any,product:Products){
    return this.httpClient.put(`${this.baseUrl}${id}`,product)

  }
  getProductsByCategory(id:any){
    return this.httpClient.get<Products[]>(`${this.baseUrl}filter/${id}`)
  }
  searchProductByName(name:any){
    return this.httpClient.get<Products[]>(`${this.baseUrl}search?name=${name}`)

  }


}
