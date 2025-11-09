import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { DashboardStats } from '../dashboard/admin-dashboard/admin-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getDashboardStats(): Observable<DashboardStats> {
    // Simulate API call - replace with actual HTTP call
    const mockData: DashboardStats = {
      totalProducts: 154,
      salesToday: 2560,
      lowStockCount: 12,
      pendingOrders: 7,
      totalRevenue: 45230,
      newCustomers: 23,
      totalOrders: 1247,
      customerSatisfaction: 94
    };

    return of(mockData).pipe(delay(800)); // Simulate network delay
  }

  getSalesData(timeframe: string): Observable<any> {
    // This would typically make an API call
    return of({}).pipe(delay(300));
  }
}