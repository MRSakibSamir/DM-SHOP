import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/products'; // <-- Spring Boot base URL

  constructor(private http: HttpClient) {}

  // ✅ Get all products
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // ✅ Get a single product by ID
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create new product
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // ✅ Update existing product
  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // ✅ Delete product by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Increase stock (purchase)
  purchase(product: Product, quantity: number): Observable<Product> {
    const updated = { ...product, stock: product.stock + quantity };
    return this.update(product.id!, updated);
  }

  // ✅ Decrease stock (sale)
  sell(product: Product, quantity: number): Observable<Product> {
    const updated = { ...product, stock: product.stock - quantity };
    return this.update(product.id!, updated);
  }
  
  
  

  
}
