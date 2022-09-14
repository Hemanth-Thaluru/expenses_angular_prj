import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-add-category',
  templateUrl: './data-add-category.component.html',
  styleUrls: ['./data-add-category.component.css']
})
export class DataAddCategoryComponent implements OnInit {

  exform: FormGroup;

  ngOnInit() {

  this.exform = new FormGroup({
    'name' : new FormControl(null, Validators.required),
  
  });
  }

  clicksub() {
    console.log(this.exform.get('name').value);
    this.exform.reset();
  }
  get name() {
    return this.exform.get('name');
  }

  

}
