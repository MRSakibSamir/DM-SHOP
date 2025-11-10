import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:8080/api/suppliers'; // ✅ Adjust if needed

  constructor(private http: HttpClient) {}

  /** Get all suppliers */
  getAllSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** Get supplier by ID */
  getSupplierById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /** Create a new supplier */
  createSupplier(supplier: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, supplier);
  }

  /** Update supplier info */
  updateSupplier(id: number, supplier: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, supplier);
  }

  /** Delete supplier */
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
