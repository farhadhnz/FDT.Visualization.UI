import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindTurbineComponent } from './components/digital-twin/wind-turbine/wind-turbine.component';
import { FormsModule } from '@angular/forms';
import { CreateProjectFormComponent } from './components/project/create-project-form/create-project-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './components/project/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WindTurbineComponent,
    CreateProjectFormComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
