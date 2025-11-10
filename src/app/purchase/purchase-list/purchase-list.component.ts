import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Supplier {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  cost: number;
}

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  form!: FormGroup;
  suppliers: Supplier[] = [
    { id: 1, name: 'Akij Food Ltd' },
    { id: 2, name: 'Fresh Traders' },
  ];

  products: Product[] = [
    { id: 1, name: 'Milk Vita Butter 100gm', cost: 150 },
    { id: 2, name: 'ACI Pure Salt 1kg', cost: 45 },
    { id: 3, name: 'Mojo 1L', cost: 60 },
    { id: 4, name: 'Rupchanda Soyabean Oil 5L', cost: 880 },
  ];

  removingRows: number[] = [];
  addedRows: number[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      poNumber: [this.generatePoNumber()],
      date: [this.today(), Validators.required],
      expectedDate: [this.today()],
      status: ['Pending'],
      supplierId: [null, Validators.required],
      notes: [''],
      items: this.fb.array([]),
      shipping: [0, Validators.min(0)],
      discount: [0, Validators.min(0)],
      taxRate: [5, Validators.min(0)],
    });
    this.addItem();
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  generatePoNumber(): string {
    const d = new Date();
    return `PO-${d.getFullYear().toString().slice(2)}${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}-${d.getHours()}${d.getMinutes()}`;
  }

  createItem(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]],
    });
  }

  addItem(): void {
    const index = this.items.length;
    this.items.push(this.createItem());
    this.addedRows.push(index);
    setTimeout(() => (this.addedRows = this.addedRows.filter(i => i !== index)), 300);
  }

  removeItem(index: number): void {
    this.removingRows.push(index);
    setTimeout(() => {
      this.items.removeAt(index);
      this.removingRows = this.removingRows.filter(i => i !== index);
    }, 300);
  }

  removeAllItems(): void {
    if (confirm('Are you sure you want to remove all items?')) {
      this.items.clear();
    }
  }

  onProductChange(index: number): void {
    const item = this.items.at(index);
    const pid = item.get('productId')?.value;
    const product = this.products.find(p => p.id === +pid);
    if (product) {
      item.patchValue({ cost: product.cost });
    }
  }

  lineTotal(index: number): number {
    const row = this.items.at(index);
    const qty = Number(row.get('qty')?.value || 0);
    const cost = Number(row.get('cost')?.value || 0);
    return qty * cost;
  }

  get subtotal(): number {
    return this.items.controls.reduce((sum, _, i) => sum + this.lineTotal(i), 0);
  }

  get taxAmount(): number {
    const rate = (this.form.get('taxRate')?.value || 0) / 100;
    const base = Math.max(this.subtotal - this.discount + this.shipping, 0);
    return base * rate;
  }

  get shipping(): number {
    return Math.max(Number(this.form.get('shipping')?.value || 0), 0);
  }

  get discount(): number {
    return Math.min(Number(this.form.get('discount')?.value || 0), this.subtotal);
  }

  get grandTotal(): number {
    return this.subtotal + this.shipping - this.discount + this.taxAmount;
  }

  addSupplier(name: string): void {
    if (!name.trim()) return;
    const newSupplier = { id: Date.now(), name };
    this.suppliers.push(newSupplier);
  }

  onSubmit(): void {
    if (this.form.invalid || this.subtotal <= 0) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.form.value,
      subtotal: this.subtotal,
      taxAmount: this.taxAmount,
      grandTotal: this.grandTotal,
    };
    console.log('Purchase Saved:', payload);
    alert('✅ Purchase record saved!');
  }
}
