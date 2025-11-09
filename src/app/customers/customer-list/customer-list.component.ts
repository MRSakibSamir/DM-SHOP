import { Component, OnInit } from '@angular/core';
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  ngOnInit(): void {
    this.customers = [
      { id: 1, name: 'Taskin Ahmed', email: 'john@example.com', phone: '01234567890' },
      { id: 2, name: 'Sujon Ahmed', email: 'jane@example.com', phone: '01876543210' }
    ];
  }

  view(id: number) {
    console.log('Viewing customer', id);
  }

  edit(id: number) {
    console.log('Editing customer', id);
  }
}