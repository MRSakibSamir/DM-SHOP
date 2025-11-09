import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  form!: FormGroup;

  suppliers: Supplier[] = [
    { id: 1, name: 'Acme Traders' },
    { id: 2, name: 'Global Mart Ltd' },
    { id: 3, name: 'Fresh Foods Supply' },
    { id: 4, name: 'Akij Group' }
  ];

  products: Product[] = [
    { id: 1, name: 'Milk Vita Butter 100gm',  cost: 150 },
    { id: 2, name: 'Farm Fresh Milk Powder 1L',   cost: 910 },
    { id: 3, name: 'ACI Pure Chinigura Rice 1kg', cost: 310 },
    { id: 4, name: 'Mojo 1L', cost: 60 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      poNumber: [this.generatePoNumber(), Validators.required],
      date: [this.today(), Validators.required],
      expectedDate: [this.today()],
      supplierId: [null, Validators.required],
      status: ['Pending', Validators.required],
      items: this.fb.array([this.createItem()]),
      shipping: [0, [Validators.min(0)]],
      discount: [0, [Validators.min(0)]],
      taxRate: [5, [Validators.min(0)]],
      notes: ['']
    });
  }

  // helpers
  today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  generatePoNumber(): string {
    const d = new Date();
    return `PO-${d.getFullYear().toString().slice(2)}${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${d.getDate().toString().padStart(2, '0')}-${d.getHours()}${d.getMinutes()}`;
  }

  // supplier add
  addSupplier(name: string): void {
    const clean = (name || '').trim();
    if (!clean) return;

    const nextId = this.suppliers.length
      ? Math.max(...this.suppliers.map(s => s.id)) + 1
      : 1;

    this.suppliers.push({ id: nextId, name: clean });
    this.form.patchValue({ supplierId: nextId });
  }

  // items form
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(i: number): void {
    if (this.items.length > 1) this.items.removeAt(i);
  }

  onProductChange(i: number): void {
    const row = this.items.at(i) as FormGroup;
    const pid = row.get('productId')?.value;
    const found = this.products.find(p => p.id === +pid);
    if (found) row.patchValue({ cost: found.cost }, { emitEvent: false });
  }

  // calculations
  lineTotal(i: number): number {
    const g = this.items.at(i) as FormGroup;
    const qty = Number(g.get('qty')?.value || 0);
    const cost = Number(g.get('cost')?.value || 0);
    return qty * cost;
  }

  get subtotal(): number {
    return this.items.controls.reduce((sum, _, i) => sum + this.lineTotal(i), 0);
  }

  get shipping(): number {
    return Math.max(Number(this.form.get('shipping')?.value || 0), 0);
  }

  get discount(): number {
    return Math.min(Number(this.form.get('discount')?.value || 0), this.subtotal + this.shipping);
  }

  get taxAmount(): number {
    const rate = Number(this.form.get('taxRate')?.value || 0) / 100;
    const base = Math.max(this.subtotal + this.shipping - this.discount, 0);
    return base * rate;
  }

  get grandTotal(): number {
    return this.subtotal + this.shipping - this.discount + this.taxAmount;
  }

  // submit
  onSubmit(): void {
    if (this.form.invalid || this.subtotal <= 0) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.form.value,
      subtotal: this.subtotal,
      shipping: this.shipping,
      discount: this.discount,
      taxAmount: this.taxAmount,
      grandTotal: this.grandTotal
    };

    console.log('Sales SUBMIT:', payload);
    alert('Sales record saved! (check console for payload)');

    // reset form
    this.form.reset({
      poNumber: this.generatePoNumber(),
      date: this.today(),
      expectedDate: this.today(),
      supplierId: null,
      status: 'Pending',
      items: [],
      shipping: 0,
      discount: 0,
      taxRate: 5,
      notes: ''
    });
    this.items.push(this.createItem());
  }
}
