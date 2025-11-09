import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Customer {
  id: number;
  name: string;
}

interface SaleItem {
  productId: number;
  price: number;
  qty: number;
}

interface Sale {
  id?: number;
  date: string;
  customerId: number | null;
  status: string;
  items: SaleItem[];
}

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss'],
})
export class SalesFormComponent implements OnInit {
  @Input() sale?: Sale; // for edit mode
  @Input() products: Product[] = [];
  @Input() customers: Customer[] = [];

  form: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      customerId: [null, Validators.required],
      status: ['Placed', Validators.required],
      items: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    if (this.sale) {
      this.isEditMode = true;
      this.form.patchValue({
        date: this.sale.date,
        customerId: this.sale.customerId,
        status: this.sale.status,
      });
      this.sale.items.forEach((item) => this.addItem(item));
    } else {
      this.addItem(); // start with 1 empty item
    }
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(item?: SaleItem) {
    const fg = this.fb.group({
      productId: [item?.productId || null, Validators.required],
      price: [item?.price || 0, [Validators.required, Validators.min(0)]],
      qty: [item?.qty || 1, [Validators.required, Validators.min(1)]],
    });
    this.items.push(fg);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onProductChange(index: number) {
    const control = this.items.at(index);
    const productId = control.value.productId;
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      control.patchValue({ price: product.price });
    }
  }

  get total(): number {
    return this.items.controls.reduce((sum, row) => {
      const val = row.value;
      return sum + (val.price || 0) * (val.qty || 0);
    }, 0);
  }

  onSubmit() {
    if (this.form.invalid) return;
    const saleData: Sale = this.form.value;
    console.log('Submitting sale:', saleData);
    // Here you can call your service to save or update the sale
  }
}
