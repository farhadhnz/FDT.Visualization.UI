import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project/project-list/project-list.component'
import { DigitalTwinListComponent } from './components/digital-twin/digital-twin-list/digital-twin-list.component'
import { SimulationComponent } from './components/simulation/simulation/simulation.component'

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'project/:projectId/digitalTwins', component: DigitalTwinListComponent },
  { path: 'simulation/:id', component: SimulationComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
