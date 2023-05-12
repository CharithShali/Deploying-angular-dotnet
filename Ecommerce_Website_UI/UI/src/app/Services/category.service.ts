import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = "https://localhost:44325/api/Category/"
  constructor(private httpClient: HttpClient) {}
  addCategory(catObj:any){
    return this.httpClient.post<any>(`${this.baseUrl}addcategory`,catObj)
  }
  getAllCategories(){
    return this.httpClient.get<Category[]>(`${this.baseUrl}`)
  }

}
