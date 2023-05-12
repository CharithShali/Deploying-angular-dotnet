import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AuthGuard } from './Gaurd/auth.guard';
import { CartComponent } from './Components/cart/cart.component';

import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { OrderComponent } from './Components/order/order.component';
import { FilterComponent } from './Components/filter/filter.component';
import { SearchProductComponent } from './Components/search-product/search-product.component';

const routes :Routes=[
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'addproduct',component:AddProductComponent},
  {path:'addcategory',component:CategoryComponent,canActivate:[AuthGuard]},
  {path:'products',component:ProductsComponent},
  { path: 'product/:id', component: ProductDetailsComponent },
  {path:'',component:ProductsComponent},
  {path:'cart',component:CartComponent},
  {path:'order',component:OrderComponent},
  {path:'product/edit/:id',component:EditProductComponent},
  {path:'filter/:id',component:FilterComponent},
  {path: 'products/search', component:SearchProductComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
