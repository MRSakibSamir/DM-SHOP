import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { CategoryListComponent } from './categories/category-list/category-list.component';

import { ProductService } from './services/product.service';

import { ProductListComponent } from './products/product-list/product-list.component';

import { UserService } from './services/user.service';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { StockAdjustmentComponent } from './inventory/stock-adjustment/stock-adjustment.component';
// import { ProductDetailComponent } from './products/product-detail/product-detail.component';

import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { InventoryReportComponent } from './reports/inventory-report/inventory-report.component';
// import { ProfitLossReportComponent } from './reports/profit-loss-report/profit-loss-report.component';
import { PurchaseReportComponent } from './reports/purchase-report/purchase-report.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';

import { SalesListComponent } from './sales/sales-list/sales-list.component';
// import { CurrencySettingsComponent } from './settings/currency-settings/currency-settings.component';
// import { ShopProfileComponent } from './settings/shop-profile/shop-profile.component';
// import { TaxSettingsComponent } from './settings/tax-settings/tax-settings.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { SalesFormComponent } from './sales/sales-form/sales-form.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { PurchaseFormComponent } from './purchase/purchase-form/purchase-form.component';
import { SupplierComponent } from './supplier/supplier.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth
  { path: 'login', component: LoginComponent, data: { hideLayout: true } },
  { path: 'register', component: RegisterComponent, data: { hideLayout: true } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { hideLayout: true } },

  // Dashboard
  { path: 'dashboard/admin', component: AdminDashboardComponent },
  { path: 'dashboard/user', component: UserDashboardComponent },
  
  

  // Products
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  // { path: 'products/view/:id', component: ProductDetailComponent },

  

  // Users
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserAddComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'users/view/:id', component: UserDetailComponent },



  { path: 'sales', component: SalesListComponent },
  { path: 'sales/form', component: SalesFormComponent },
  { path: 'sales/form/:id', component: SalesFormComponent },


  { path: 'category', component: CategoryListComponent },
  { path: 'category/form', component: CategoryFormComponent },
  { path: 'category/form/:id', component: CategoryFormComponent },


  { path: 'purchase', component: PurchaseListComponent },
  { path: 'purchase/form', component: PurchaseFormComponent },
  { path: 'purchase/form/:id', component: PurchaseFormComponent },



  // Customers
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/form', component: CustomerListComponent },
  { path: 'customers/form/:id', component: CustomerListComponent },

  { path: 'Suppliers', component: SupplierComponent },
  




  
  // Inventory
  { path: 'inventory', component: InventoryListComponent },
  { path: 'inventory/adjust', component: StockAdjustmentComponent },

  // Reports
  { path: 'reports/sales', component: SalesReportComponent },
  { path: 'reports/purchases', component: PurchaseReportComponent },
  { path: 'reports/inventory', component: InventoryReportComponent },
  // { path: 'reports/profit-loss', component: ProfitLossReportComponent },

  // // Settings
  // { path: 'settings/shop-profile', component: ShopProfileComponent },
  // { path: 'settings/tax', component: TaxSettingsComponent },
  // { path: 'settings/currency', component: CurrencySettingsComponent },

  // Wildcard (404)
  { path: '**', redirectTo: 'dashboard/admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
