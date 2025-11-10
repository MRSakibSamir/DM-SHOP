import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
  private nextId = 1;
  private baseUrl = 'http://localhost:8080/api/auth';

  // BehaviorSubject to emit updates to any subscriber
  private customersSubject = new BehaviorSubject<Customer[]>(this.customers);
  customers$ = this.customersSubject.asObservable();

  constructor() {}

  // Get all customers
  getAllCustomers(): Observable<Customer[]> {
    return this.customers$;
  }

  // Add a new customer
  addCustomer(customer: Partial<Customer>): void {
    const newCustomer: Customer = {
      id: this.nextId++,
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || ''
    };
    this.customers.push(newCustomer);
    this.customersSubject.next(this.customers);
  }

  // Update an existing customer
  updateCustomer(updated: Customer): void {
    const index = this.customers.findIndex(c => c.id === updated.id);
    if (index !== -1) {
      this.customers[index] = { ...updated };
      this.customersSubject.next(this.customers);
    }
  }

  // Delete a customer
  deleteCustomer(id: number): void {
    this.customers = this.customers.filter(c => c.id !== id);
    this.customersSubject.next(this.customers);
  }
}



