import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SupplierService } from '../../services/supplier.service';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html'
})
export class PurchaseFormComponent implements OnInit {
  form!: FormGroup;
  products: any[] = [];
  suppliers: any[] = [];

  // Summary values
  subtotal = 0;
  taxAmount = 0;
  grandTotal = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
    // this.loadSuppliers();

    // Watch for real-time recalculation
    this.form.valueChanges.subscribe(() => this.calculateTotals());
  }

  /** Initialize Reactive Form */
  private initForm() {
    this.form = this.fb.group({
      poNumber: ['', Validators.required],
      date: ['', Validators.required],
      expectedDate: [''],
      supplierId: ['', Validators.required],
      status: ['Pending', Validators.required],
      notes: [''],
      shipping: [0, [Validators.min(0)]],
      discount: [0, [Validators.min(0)]],
      taxRate: [0, [Validators.min(0)]],
      items: this.fb.array([])
    });
  }

  /** Form getters */
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  /** Add new item row */
  addItem(): void {
    const itemForm = this.fb.group({
      productId: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]]
    });
    this.items.push(itemForm);
    this.calculateTotals();
  }

  /** Remove item row */
  removeItem(index: number): void {
    this.items.removeAt(index);
    this.calculateTotals();
  }

  /** Reset the entire form */
  resetForm(): void {
    this.form.reset({
      status: 'Pending',
      shipping: 0,
      discount: 0,
      taxRate: 0,
      items: []
    });
    this.items.clear();
    this.subtotal = this.taxAmount = this.grandTotal = 0;
  }

  /** Fetch all products */
  private loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error loading products', err)
    });
  }

  /** Fetch all suppliers */
  private loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe({
      next: (data: any[]) => (this.suppliers = data),
      error: (err: any) => console.error('Error loading suppliers', err)
    });
  }

  /** Calculate subtotal, tax, and grand total */
  calculateTotals(): void {
    const items = this.items.value || [];
    this.subtotal = items.reduce((sum: number, item: any) => sum + (item.cost * item.qty || 0), 0);

    const shipping = this.form.get('shipping')?.value || 0;
    const discount = this.form.get('discount')?.value || 0;
    const taxRate = this.form.get('taxRate')?.value || 0;

    const taxableAmount = this.subtotal - discount + shipping;
    this.taxAmount = (taxableAmount * taxRate) / 100;
    this.grandTotal = taxableAmount + this.taxAmount;
  }

  /** Submit form data to backend */
  onSubmit(): void {
    if (this.form.invalid || this.subtotal <= 0) return;

    const payload = {
      ...this.form.value,
      subtotal: this.subtotal,
      taxAmount: this.taxAmount,
      grandTotal: this.grandTotal
    };

    this.purchaseService.createPurchase(payload).subscribe({
      next: (res: any) => {
        alert('✅ Purchase created successfully!');
        this.resetForm();
      },
      error: (err: any) => {
        console.error('Error creating purchase:', err);
        alert('❌ Failed to create purchase');
      }
    });
  }
}
