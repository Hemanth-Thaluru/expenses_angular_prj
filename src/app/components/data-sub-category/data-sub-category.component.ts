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
  styleUrls: ['./data-sub-category.component.css']
})
export class DataSubCategoryComponent implements OnInit {

  subCategories: SubCategory[];
  subCategory: SubCategory;
  subcategoryid: number;
  strid: string;
  ld: number;
  k:number=0;
  angForm: FormGroup;
  categories: Category[];


  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    public dataServices: DataService,
    private fb: FormBuilder,
    public alertService: AlertService
  ) { 
    this.createForm()
  }

  ngOnInit(): void {
    this.subCategories = this.dataServices.getSubcategories();
    this.categories = this.dataServices.getCategorys();

  }

  // addsubCategory(newSubCategoryName: HTMLInputElement, newCategoryId: HTMLInputElement, newSubCategoryDescription: HTMLInputElement) {
  //   this.subcategoryid = this.subCategories.length + 1;
  //   this.strid = newCategoryId.value

  //   this.ld = (this.strid as unknown) as number

  //   this.subCategory = {
  //     subCategoryId: this.subcategoryid,
  //     categoryIdOfSub: this.ld,
  //     subCategoryName: newSubCategoryName.value,
  //     subcategoryDescription: newSubCategoryDescription.value
  //   }

  //   this.dataServices.addSubCategory(this.subCategory);

  //   newSubCategoryName.value = '';
  //   newSubCategoryDescription.value = '';

  // }

  createForm() {
    this.angForm = this.fb.group({
      subCategoryName: [history.state.subCategoryName, Validators.required],
      categoryIdOfSub: [history.state.categoryIdOfSub, Validators.required],
      subcategoryDescription: [history.state.subcategoryDescription, Validators.required]
    });
  }

  onSubCategorySubmit() {

    this.subCategories = this.dataServices.getSubcategories();
    
    this.subcategoryid = history.state.subCategoryId === undefined ? (this.subCategories.length + 1) : history.state.subCategoryId
    this.dataServices.addSubCategory({
      subCategoryId: this.subcategoryid,
      categoryIdOfSub: this.angForm.get('categoryIdOfSub').value,
      subCategoryName: this.angForm.get('subCategoryName').value,
      subcategoryDescription: this.angForm.get('subcategoryDescription').value
    });
    history.state.subCategoryId === undefined ? this.alertService.success('SubCategory Added!!',this.options) : this.alertService.success('SubCategory Edited Sucessfully!',this.options)
    
    this.angForm.reset()
    

  }
}
