import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wind-turbine',
  templateUrl: './wind-turbine.component.html',
  styleUrls: ['./wind-turbine.component.css']
})
export class WindTurbineComponent {
  @Input() rotationSpeed: number = 0;

  calculateAnimationDuration(rotationSpeed: number): number {
    return rotationSpeed > 0 ? 20000 / rotationSpeed : 0;
  }
}