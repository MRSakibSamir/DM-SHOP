import { Component } from '@angular/core';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
  editing?: boolean; // flag for edit mode
}

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent {
  // Predefined categories
  categories: string[] = ['Dairy Food','Bakery Item','Groceries', 'Beverages', 'Personal Care', 'Fruits'];

  // Predefined product names
  productNames: string[] = ['Butter', 'Cake', 'Rice', 'Mojo', 'Shampoo','Apple'];

  // Sample new product model
  newProduct: Product = {
    name: '',
    category: '',
    price: 0,
    stock: 0
  };

  // Inventory list
  products: Product[] = [];

  // Create a new product
  create() {
    if (this.newProduct.name && this.newProduct.category) {
      this.products.push({ ...this.newProduct });
      this.resetNewProduct();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // View product details
  view(product: Product) {
    console.log('Viewing product:', product);
  }

  // Enable edit mode for a product
  edit(product: Product) {
    product.editing = true;
  }

  // Save changes after editing
  save(product: Product) {
    product.editing = false;
  }

  // Cancel editing changes
  cancel(product: Product) {
    product.editing = false;
  }

  // Delete a product
  delete(product: Product) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  // Reset the new product form
  private resetNewProduct() {
    this.newProduct = {
      name: '',
      category: '',
      price: 0,
      stock: 0
    };
  }
}
