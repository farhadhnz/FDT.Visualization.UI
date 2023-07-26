import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindTurbineComponent } from './components/digital-twin/wind-turbine/wind-turbine.component';
import { FormsModule } from '@angular/forms';
import { CreateProjectFormComponent } from './components/project/create-project-form/create-project-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { DigitalTwinListComponent } from './components/digital-twin/digital-twin-list/digital-twin-list.component';
import { SimulationComponent } from './components/simulation/simulation/simulation.component';
import { GraphComponent } from './components/simulation/graph/graph.component';
import { ContinuousSimulationComponent } from './components/simulation/continuous-simulation/continuous-simulation.component';

@NgModule({
  declarations: [
    AppComponent,
    WindTurbineComponent,
    CreateProjectFormComponent,
    ProjectListComponent,
    DigitalTwinListComponent,
    SimulationComponent,
    GraphComponent,
    ContinuousSimulationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
