import { Component } from '@angular/core';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
  editing?: boolean; // flag for edit mode
  purchaseQty?: number; // temporary purchase input
  saleQty?: number;     // temporary sale input
}

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent {
  categories: string[] = ['Dairy Food','Bakery Item','Groceries', 'Beverages', 'Personal Care', 'Fruits'];
  productNames: string[] = ['Butter', 'Cake', 'Rice', 'Mojo', 'Shampoo','Apple'];

  newProduct: Product = {
    name: '',
    category: '',
    price: 0,
    stock: 0
  };

  products: Product[] = [];

  // Create a new product
  create() {
    if (this.newProduct.name && this.newProduct.category && this.newProduct.price >= 0 && this.newProduct.stock >= 0) {
      this.products.push({ ...this.newProduct });
      this.resetNewProduct();
    } else {
      alert('Please fill in all required fields with valid values.');
    }
  }

  // View product details
  view(product: Product) {
    alert(`Product: ${product.name}\nCategory: ${product.category}\nPrice: $${product.price}\nStock: ${product.stock}`);
  }

  // Enable edit mode
  edit(product: Product) {
    product.editing = true;
  }

  // Save changes after editing
  save(product: Product) {
    if (product.name && product.category && product.price >= 0 && product.stock >= 0) {
      product.editing = false;
    } else {
      alert('Please enter valid values.');
    }
  }

  // Cancel editing
  cancel(product: Product) {
    product.editing = false;
  }

  // Delete a product
  delete(product: Product) {
    const index = this.products.indexOf(product);
    if (index > -1) this.products.splice(index, 1);
  }

  // Purchase product: increase stock
  purchase(product: Product) {
    if (product.purchaseQty && product.purchaseQty > 0) {
      product.stock += product.purchaseQty;
      product.purchaseQty = undefined; // reset input
    } else {
      alert('Enter a valid purchase quantity.');
    }
  }

  // Sell product: decrease stock
  sell(product: Product) {
    if (product.saleQty && product.saleQty > 0) {
      if (product.saleQty > product.stock) {
        alert('Not enough stock!');
      } else {
        product.stock -= product.saleQty;
        product.saleQty = undefined; // reset input
      }
    } else {
      alert('Enter a valid sale quantity.');
    }
  }

  // Reset new product form
  private resetNewProduct() {
    this.newProduct = {
      name: '',
      category: '',
      price: 0,
      stock: 0
    };
  }
}
