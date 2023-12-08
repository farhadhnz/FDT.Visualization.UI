import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindTurbineComponent } from './components/digital-twin/wind-turbine/wind-turbine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProjectFormComponent } from './components/project/create-project-form/create-project-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { DigitalTwinListComponent } from './components/digital-twin/digital-twin-list/digital-twin-list.component';
import { SimulationComponent } from './components/simulation/simulation/simulation.component';
import { GraphComponent } from './components/simulation/graph/graph.component';
import { ContinuousSimulationComponent } from './components/simulation/continuous-simulation/continuous-simulation.component';
import { secrets } from '../secrets/secrets';
import { WindTurbineMapComponent } from './components/digital-twin/wind-turbine-map/wind-turbine-map.component';
import { CreateDigitalTwinComponent } from './components/digital-twin/create-digital-twin/create-digital-twin.component';
import { DigitalTwinDashboardComponent } from './components/digital-twin/digital-twin-dashboard/digital-twin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    WindTurbineComponent,
    CreateProjectFormComponent,
    ProjectListComponent,
    DigitalTwinListComponent,
    SimulationComponent,
    GraphComponent,
    ContinuousSimulationComponent,
    WindTurbineMapComponent,
    CreateDigitalTwinComponent,
    DigitalTwinDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CanvasJSAngularChartsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: secrets.mapboxAccessToken,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
