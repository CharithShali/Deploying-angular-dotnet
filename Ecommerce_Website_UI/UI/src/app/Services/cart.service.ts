import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, CartItem, cart } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrlCart: string = "https://localhost:44325/api/Cart/"
  private baseUrlCartItem: string = "https://localhost:44325/api/CartItem/"

  constructor(private httpClient: HttpClient) {}

  getCartByEmail(email:any){
    return this.httpClient.get<Cart>(`${this.baseUrlCart}`,email)
  }

  AddACart(cart:Cart){
    return this.httpClient.post<number>(`${this.baseUrlCart}Cart`,cart)
  }

  AddItemToCart(cartItem:CartItem,id:any){
    return this.httpClient.post(`${this.baseUrlCartItem}${id}`,cartItem)

  }
getCartItems(id:number){
  return this.httpClient.get<cart[]>(`${this.baseUrlCart}Cart?id=${id}`)
}

deleteCartItem(id:number){
  return this.httpClient.delete(`${this.baseUrlCartItem}delete?id=${id}`)
}
}
