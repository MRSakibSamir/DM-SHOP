import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
categoryForm: FormGroup;
  editingCategoryId?: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0],
      quantity: [0],
      parentCategoryId: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.editingCategoryId = +id;
        this.loadCategory(this.editingCategoryId);
      }
    });
  }

  loadCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe(cat => {
      this.categoryForm.patchValue(cat);
    });
  }

  submit() {
    if (this.categoryForm.invalid) return;

    const category: Category = this.categoryForm.value;

    if (this.editingCategoryId) {
      this.categoryService.updateCategory(this.editingCategoryId, category)
        .subscribe(() => this.router.navigate(['/category']));
    } else {
      this.categoryService.createCategory(category)
        .subscribe(() => this.router.navigate(['/category']));
    }
  }
}
