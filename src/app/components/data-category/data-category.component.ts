import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { AlertService } from 'src/app/_alert';

import { Category } from 'src/app/models/Category';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data-category',
  templateUrl: './data-category.component.html',
  styleUrls: ['./data-category.component.css']
})
export class DataCategoryComponent implements OnInit {

  angForm:FormGroup;

  categorys: Category[];
  categoryid:number
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };  

  constructor(
    public categoryService: DataService,
    private fb:FormBuilder,
    public alertService: AlertService
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
    this.categorys = this.categoryService.getCategorys();
    this.categoryid=this.categorys.length + 1
  }


  createForm(){
    this.angForm = this.fb.group({
      categoryName: [history.state.categoryName, Validators.required ],
      categoryDescription: [history.state.categoryDescription, Validators.required ]
   }); 
  }

  onCategorySubmit(){
   
    this.categorys = this.categoryService.getCategorys();
    this.categoryid=  history.state.categoryId===undefined?(this.categorys.length + 1):history.state.categoryId
    this.categoryService.addCategory({
      categoryId:this.categoryid,
      categoryName: this.angForm.get('categoryName').value,
      categoryDescription: this.angForm.get('categoryDescription').value
    });
    history.state.categoryId === undefined ? this.alertService.success('Category Added!!',this.options) : this.alertService.success('Category Edited Sucessfully!',this.options)
    this.angForm.reset()
  }

}
