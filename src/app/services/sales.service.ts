// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface SaleItemPayload {
  productId: string | number;
  qty: number;
  price: number;
}

export interface CreateSalePayload {
  invoiceNumber: string;
  date: string;          // ISO string or yyyy-MM-dd from form
  dueDate?: string;
  customerId: string | number;
  status: 'Pending' | 'Paid' | 'Partially Paid' | 'Cancelled';
  notes?: string;
  shipping: number;
  discount: number;
  taxRate: number;
  items: SaleItemPayload[];
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
}

@Injectable({ providedIn: 'root' })
export class SaleService {
  private baseUrl = '/api/sales';

  constructor(private http: HttpClient) {}

  createSale(payload: CreateSalePayload): Observable<any> {
    return this.http.post<any>(this.baseUrl, payload);
  }

  getSaleById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  listSales(params?: { page?: number; size?: number; q?: string }): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params: (params as any) || {} });
  }
}
