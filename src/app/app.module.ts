import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindTurbineComponent } from './components/digital-twin/wind-turbine/wind-turbine.component';
import { FormsModule } from '@angular/forms';
import { CreateProjectFormComponent } from './components/project/create-project-form/create-project-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WindTurbineComponent,
    CreateProjectFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
