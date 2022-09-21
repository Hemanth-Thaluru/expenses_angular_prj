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
    this.categoryService.getCategorys().subscribe((x:Category[])=>this.categorys=x);
  }


  createForm(){
    this.angForm = this.fb.group({
      categoryName: [history.state.name, Validators.required ],
      categoryDescription: [history.state.description, Validators.required ]
   }); 
  }

  onCategorySubmit(){
    let k=0
    this.categoryService.getCategorys().subscribe((x:Category[])=>this.categorys=x);
    this.categoryid= history.state.id===undefined?(k=1):history.state.id
   if(k==0){ this.categoryService.editCategory({
      id:this.categoryid,
      name: this.angForm.get('categoryName').value,
      description: this.angForm.get('categoryDescription').value
    });}
    if(k==1)
    {
      this.categoryService.addCategory({
        id:1,
        name: this.angForm.get('categoryName').value,
        description: this.angForm.get('categoryDescription').value
      });
    }
    history.state.id === undefined ? this.alertService.success('Category Added!!',this.options) : this.alertService.success('Category Edited Sucessfully!',this.options)
    this.angForm.reset()
  }

}
