import { Component } from '@angular/core';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {

  // List of customers
  customers: Customer[] = [];

  // Model for new customer form
  newCustomer: Partial<Customer> = {};

  // Model for editing customer
  editCustomer: Customer | null = null;

  private nextId = 1; // Simple ID generator

  // Add new customer
  create() {
    if (!this.newCustomer.name || !this.newCustomer.email) {
      alert('Name and Email are required!');
      return;
    }

    const customer: Customer = {
      id: this.nextId++,
      name: this.newCustomer.name!,
      email: this.newCustomer.email!,
      phone: this.newCustomer.phone || '',
      address: this.newCustomer.address || '',
      city: this.newCustomer.city || ''
    };

    this.customers.push(customer);

    // Reset form
    this.newCustomer = {};
  }

  // Edit customer
  edit(customer: Customer) {
    // Create a copy to avoid direct binding until save
    this.editCustomer = { ...customer };
  }

  // Save edited customer
  save() {
    if (!this.editCustomer) return;

    const index = this.customers.findIndex(c => c.id === this.editCustomer!.id);
    if (index !== -1) {
      this.customers[index] = this.editCustomer;
    }

    this.editCustomer = null;
  }

  // Cancel editing
  cancel() {
    this.editCustomer = null;
  }

  // Delete customer
  delete(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers = this.customers.filter(c => c.id !== id);
    }
  }
}
