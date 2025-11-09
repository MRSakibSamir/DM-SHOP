import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  selectedFiles: File[] = [];
  selectedFilesPreview: string[] = [];
  editingProductId?: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editingProductId = +id;
        this.loadProduct(this.editingProductId);
      }
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe(cats => (this.categories = cats));
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(p => {
      this.productForm.patchValue({
        name: p.name,
        description: p.description,
        price: p.price,
        quantity: p.quantity,
        categoryId: p.categoryId
      });
    });
  }

  onFileChange(event: any) {
    const files = Array.from(event.target.files) as File[];
    for (let file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large!`);
        continue;
      }

      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = e => this.selectedFilesPreview.push(reader.result as string);
      reader.readAsDataURL(file);
    }
    event.target.value = ''; // allow re-selection of same files
  }

  removeSelectedImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.selectedFilesPreview.splice(index, 1);
  }

  submit() {
    if (this.productForm.invalid) return;
    const product: Product = this.productForm.value;

    if (this.editingProductId) {
      this.productService.updateProduct(this.editingProductId, product, this.selectedFiles)
        .subscribe(() => this.router.navigate(['/products']));
    } else {
      this.productService.createProduct(product, this.selectedFiles)
        .subscribe(() => this.router.navigate(['/products']));
    }
  }
}
