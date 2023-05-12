import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/product/product.component';
import { HomeComponent } from './Components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CartComponent } from './Components/cart/cart.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import { OrderComponent } from './Components/order/order.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FilterComponent } from './Components/filter/filter.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SearchProductComponent } from './Components/search-product/search-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,

    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    AddProductComponent,
    CategoryComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,

    EditProductComponent,
    FilterComponent,
    SearchProductComponent
  ],
  exports: [MatCardModule],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NgToastModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    CdkTableModule,
    MatTableModule,
    MatProgressBarModule,
    MatDividerModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
