import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from '../model/category';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private apiUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product, files: File[]): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    files.forEach(file => formData.append('images', file));
    return this.http.post<Product>(this.apiUrl, formData);
  }

  updateProduct(id: number, product: Product, files: File[]): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    files.forEach(file => formData.append('images', file));
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }
  // private apiUrl = 'http://localhost:8080/api/products';
  // private products: Product[] = []; // Local fallback cache

  // constructor(private http: HttpClient) {}

  // /** 🌐 Get all products (from backend or fallback to local) */
  // getAllProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl).pipe(
  //     tap(products => (this.products = products)),
  //     catchError(err => {
  //       console.warn('⚠️ Backend unavailable — using local data:', err.message);
  //       return of(this.products);
  //     })
  //   );
  // }

  // /** 🌐 Get product by ID (from backend or local fallback) */
  // getProductById(id: number): Observable<Product | undefined> {
  //   return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
  //     catchError(() => {
  //       console.warn(`⚠️ Using local data for product ID ${id}`);
  //       return of(this.products.find(p => p.id === id));
  //     })
  //   );
  // }

  // /** 🌐 Create new product (and add to local cache) */
  // createProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(this.apiUrl, product).pipe(
  //     tap(newProduct => this.products.push(newProduct)),
  //     catchError(() => {
  //       // Local fallback
  //       product.id = this.products.length > 0
  //         ? Math.max(...this.products.map(p => p.id || 0)) + 1
  //         : 1;
  //       product.createdAt = new Date();
  //       product.updatedAt = new Date();
  //       this.products.push(product);
  //       console.warn('⚠️ Product added locally:', product);
  //       return of(product);
  //     })
  //   );
  // }

  // /** 🌐 Update existing product (or update local data) */
  // updateProduct(product: Product): Observable<Product | undefined> {
  //   return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
  //     tap(updated => {
  //       const index = this.products.findIndex(p => p.id === updated.id);
  //       if (index !== -1) this.products[index] = updated;
  //     }),
  //     catchError(() => {
  //       const index = this.products.findIndex(p => p.id === product.id);
  //       if (index !== -1) {
  //         product.updatedAt = new Date();
  //         this.products[index] = product;
  //         console.warn('⚠️ Product updated locally:', product);
  //         return of(product);
  //       }
  //       return of(undefined);
  //     })
  //   );
  // }

  // /** 🌐 Delete product (or remove locally) */
  // deleteProduct(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
  //     tap(() => {
  //       this.products = this.products.filter(p => p.id !== id);
  //     }),
  //     catchError(() => {
  //       this.products = this.products.filter(p => p.id !== id);
  //       console.warn('⚠️ Product deleted locally, ID:', id);
  //       return of(void 0);
  //     })
  //   );
  // }

  // /** 💾 Local methods (optional direct access) */
  // getAllLocal(): Product[] {
  //   return this.products;
  // }

  // getLocalById(id: number): Product | undefined {
  //   return this.products.find(p => p.id === id);
  // }
}
