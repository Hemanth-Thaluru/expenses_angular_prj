import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AlertService } from 'src/app/_alert';

import { Category } from 'src/app/models/Category';
import { SubCategory } from 'src/app/models/SubCategory';

import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  categorys: Category[];

  subCategories: SubCategory[];

  angForm:FormGroup;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };  

  constructor(
    public taskService: DataService,
    public categoryService: DataService, 
    private fb:FormBuilder,
    public alertService: AlertService
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.categorys = this.categoryService.getCategorys();
    this.subCategories = this.categoryService.getSubcategories();
  }

  createForm(){
    this.angForm = this.fb.group({
      price: [history.state.price, Validators.required ],
      date: [history.state.date],
      type: [history.state.type ],
      category: [history.state.category, Validators.required ],
      subcategory: [history.state.subcategory, Validators.required ],
      description: [history.state.description ]
   }); 
  }

  onSelectingCategory(categoryId: any) {

    this.subCategories = this.categoryService.getSubcategories();
    this.subCategories = this.subCategories.filter(item => item.categoryIdOfSub === categoryId);

  }

  onExpenseSubmit(){
    this.taskService.addData({
    price: this.angForm.get('price').value,
    date:this.angForm.get('date').value,
    type: this.angForm.get('type').value,
    category: this.angForm.get('category').value,
    subcategory: this.angForm.get('subcategory').value,
    description: this.angForm.get('description').value
    });
    this.alertService.success('Expenses added !!',this.options)
    this.angForm.reset()
  }

}
