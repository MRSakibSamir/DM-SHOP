// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sales-report',
//   templateUrl: './sales-report.component.html',
//   styleUrls: ['./sales-report.component.scss']
// })
// export class SalesReportComponent {

// }

import { Component, OnInit } from '@angular/core';

interface SaleItem {
  product?: { name: string };
  price: number;
  qty: number;
  lineTotal?: number;
}

interface Sale {
  id: number;
  date: Date;
  customer?: { name: string };
  items: SaleItem[];
  total?: number;
}

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
})
export class SalesReportComponent implements OnInit {
  sales: Sale[] = [];
  totalSales: number = 0;
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.fetchSales();
  }

  fetchSales(): void {
    // Simulate API call
    setTimeout(() => {
      try {
        this.sales = [
          {
            id: 101,
            date: new Date(),
            customer: { name: 'Taskin Ahmed' },
            items: [
              { product: { name: 'Product A' }, price: 100, qty: 2 },
              { product: { name: 'Product B' }, price: 50, qty: 3 },
            ],
          },
          {
            id: 102,
            date: new Date(),
            customer: { name: 'Sujon Admed' },
            items: [
              { product: { name: 'Product C' }, price: 75, qty: 4 },
            ],
          },
        ];

        this.calculateTotals();
        this.loading = false;
      } catch (err) {
        this.error = 'Failed to load sales data';
        this.loading = false;
      }
    }, 500);
  }

  calculateTotals(): void {
    this.sales.forEach(sale => {
      sale.items.forEach(item => item.lineTotal = item.price * item.qty);
      sale.total = sale.items.reduce((sum, item) => sum + (item.lineTotal ?? 0), 0);
    });

    this.totalSales = this.sales.reduce((sum, sale) => sum + (sale.total ?? 0), 0);
  }
}
