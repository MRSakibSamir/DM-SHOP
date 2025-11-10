import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { ProductListComponent } from './products/product-list/product-list.component';

import { CategoryListComponent } from './categories/category-list/category-list.component';

import { CustomerListComponent } from './customers/customer-list/customer-list.component';

 

import { UserListComponent } from './users/user-list/user-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { StockAdjustmentComponent } from './inventory/stock-adjustment/stock-adjustment.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { PurchaseReportComponent } from './reports/purchase-report/purchase-report.component';
import { InventoryReportComponent } from './reports/inventory-report/inventory-report.component';
// import { ProfitLossReportComponent } from './reports/profit-loss-report/profit-loss-report.component';
// import { ShopProfileComponent } from './settings/shop-profile/shop-profile.component';
// import { TaxSettingsComponent } from './settings/tax-settings/tax-settings.component';
// import { CurrencySettingsComponent } from './settings/currency-settings/currency-settings.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';


import { ProductFormComponent } from './products/product-form/product-form.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';

import { PurchaseFormComponent } from './purchase/purchase-form/purchase-form.component';
import { SalesFormComponent } from './sales/sales-form/sales-form.component';
import { NgChartsModule } from 'ng2-charts';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { SupplierComponent } from './supplier/supplier.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProductListComponent,
    CategoryListComponent,
    CustomerFormComponent,
    CustomerListComponent,
    
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDetailComponent,
    SalesListComponent,
  
    PurchaseListComponent,
    InventoryListComponent,
    StockAdjustmentComponent,
    SalesReportComponent,
    PurchaseReportComponent,
    InventoryReportComponent,
    // ProfitLossReportComponent,
    // ShopProfileComponent,
    // TaxSettingsComponent,
    // CurrencySettingsComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProductFormComponent,
    CategoryFormComponent,
    
    PurchaseFormComponent,
    SalesFormComponent,
    SupplierComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
