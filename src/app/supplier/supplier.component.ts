import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Supplier {
  id: number;
  name: string;
  contactInfo?: string;
  description?: string;
  categoryId?: number;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  loading = false;
  editing = false;
  form: FormGroup;
  editingSupplierId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      contactInfo: [''],
      description: [''],
      categoryId: [null]
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading = true;
    setTimeout(() => {
      this.suppliers = [
        { id: 1, name: 'Supplier One', contactInfo: 'contact1@example.com', description: 'First supplier', categoryId: 1 },
        { id: 2, name: 'Supplier Two', contactInfo: 'contact2@example.com', description: 'Second supplier', categoryId: 2 },
      ];
      this.loading = false;
    }, 500);
  }

  startEdit(supplier: Supplier): void {
    this.editing = true;
    this.editingSupplierId = supplier.id;
    this.form.patchValue({
      name: supplier.name,
      contactInfo: supplier.contactInfo,
      description: supplier.description,
      categoryId: supplier.categoryId
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancel(): void {
    this.editing = false;
    this.editingSupplierId = null;
    this.form.reset();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.editing && this.editingSupplierId !== null) {
      const index = this.suppliers.findIndex(s => s.id === this.editingSupplierId);
      if (index !== -1) {
        this.suppliers[index] = {
          id: this.editingSupplierId,
          ...formValue
        };
        alert('✅ Supplier updated successfully!');
      }
    } else {
      const newSupplier: Supplier = {
        id: this.suppliers.length ? Math.max(...this.suppliers.map(s => s.id)) + 1 : 1,
        ...formValue
      };
      this.suppliers.push(newSupplier);
      alert('✅ Supplier created successfully!');
    }

    this.cancel();
  }

  deleteSupplier(id: number): void {
    if (confirm('🗑️ Are you sure you want to delete this supplier?')) {
      this.suppliers = this.suppliers.filter(s => s.id !== id);
      if (this.editingSupplierId === id) this.cancel();
      alert('🚮 Supplier deleted.');
    }
  }
}
