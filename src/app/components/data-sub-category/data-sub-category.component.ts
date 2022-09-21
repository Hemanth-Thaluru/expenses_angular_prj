import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Category } from 'src/app/models/Category';
import { SubCategory } from 'src/app/models/SubCategory';
import { DataService } from '../../services/data.service';

import { AlertService } from 'src/app/_alert';

@Component({
  selector: 'app-data-sub-category',
  templateUrl: './data-sub-category.component.html',
  styleUrls: ['./data-sub-category.component.css'],
})
export class DataSubCategoryComponent implements OnInit {
  subCategories: SubCategory[];
  subCategory: SubCategory;
  subcategoryid: number;
  strid: string;
  ld: number;
  k: number = 0;
  angForm: FormGroup;
  categories: Category[];

  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    public dataServices: DataService,
    private fb: FormBuilder,
    public alertService: AlertService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dataServices
      .getSubcategories()
      .subscribe((x) => (this.subCategories = x));
    this.dataServices.getCategorys().subscribe((x) => (this.categories = x));
  }

  createForm() {
    this.angForm = this.fb.group({
      subCategoryName: [history.state.name, Validators.required],
      categoryIdOfSub: [history.state.categoryId, Validators.required],
      subcategoryDescription: [history.state.description, Validators.required],
    });
  }

  onSubCategorySubmit() {
    let k = 0;
    this.dataServices
      .getSubcategories()
      .subscribe((x) => (this.subCategories = x));

    if (typeof (history.state.id)== undefined) {
      this.dataServices.addSubCategory({
        id: this.subcategoryid,
        categoryId: this.angForm.get('categoryIdOfSub').value,
        name: this.angForm.get('subCategoryName').value,
        description: this.angForm.get('subcategoryDescription').value,
      });
    } else {
      this.dataServices.editSubCategory({
        id: history.state.id,
        categoryId: this.angForm.get('categoryIdOfSub').value,
        name: this.angForm.get('subCategoryName').value,
        description: this.angForm.get('subcategoryDescription').value,
      });
    }
    history.state.id === undefined
      ? this.alertService.success('SubCategory Added!!', this.options)
      : this.alertService.success(
          'SubCategory Edited Sucessfully!',
          this.options
        );

    this.angForm.reset();
  }
}
