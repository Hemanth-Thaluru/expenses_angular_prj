import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DataCategoryComponent } from './components/data-category/data-category.component';

import { DataService } from './services/data.service';
import { DataSubCategoryComponent } from './components/data-sub-category/data-sub-category.component';
import { DataCategorylistComponent } from './components/data-categorylist/data-categorylist.component';
import { DataSubcategorylistComponent } from './components/data-subcategorylist/data-subcategorylist.component';
import { RouterModule } from '@angular/router';
import { DataAddCategoryComponent } from './components/data-add-category/data-add-category.component';
import { AlertModule } from './_alert';

@NgModule({
  declarations: [
    AppComponent,
    DataFormComponent,
    DataListComponent,
    NavigationComponent,
    DataCategoryComponent,
    DataSubCategoryComponent,
    DataCategorylistComponent,
    DataSubcategorylistComponent,
    DataAddCategoryComponent,
  

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
  
    RouterModule.forRoot([
      {path: '', component: DataListComponent},
      {path: 'addExpense', component: DataFormComponent},
      {path: 'category', component: DataCategorylistComponent},
      {path: 'category/addCategory', component: DataCategoryComponent},
      {path: 'addcategory', component: DataAddCategoryComponent},
      {path: 'subCategory', component: DataSubcategorylistComponent},
      {path: 'subCategory/addSubCategory', component: DataSubCategoryComponent},
    
     
    ]),
  
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
