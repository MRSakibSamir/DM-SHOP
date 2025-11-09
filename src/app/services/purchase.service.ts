import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8080/api/purchases'; // ✅ Spring Boot endpoint

  constructor(private http: HttpClient) {}

  /** Get all purchases */
  getAllPurchases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** Get a single purchase by ID */
  getPurchaseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /** Create a new purchase */
  createPurchase(purchase: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, purchase);
  }

  /** Update an existing purchase */
  updatePurchase(id: number, purchase: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, purchase);
  }

  /** Delete a purchase */
  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
