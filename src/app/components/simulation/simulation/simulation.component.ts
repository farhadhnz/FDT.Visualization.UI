import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimulationService } from '../../../services/simulation.service';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {
  digitalTwinId: number;
  simulatorId: number;
  simulationPaused: boolean = false;
  windSpeeds: any;
  powerOutputs: any;

  constructor(private route: ActivatedRoute,
    private simulationService: SimulationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.digitalTwinId = Number(params.get('id'));
    })
    this.simulatorId = 0;
  }

  startSimulation(): void {
    this.simulationService.startSimulation(this.digitalTwinId, this.simulatorId).subscribe({
      next: (response) => {
        console.log(response.message); // Print the success message
  
        // Extract the wind speeds and power outputs from the response
        const windSpeeds: number[] = response.windSpeeds;
        const powerOutputs: number[] = response.powerOutputs;
  
        this.windSpeeds = windSpeeds.map((windSpeed, index) => ({ x: index + 1, y: windSpeed }));
        this.powerOutputs = powerOutputs.map((powerOutput, index) => ({ x: index + 1, y: powerOutput }));

        console.log(this.windSpeeds); // Print the wind speeds
        console.log(this.powerOutputs); // Print the power outputs
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  pauseSimulation() {
    // Implement the logic to pause the simulation
    this.simulationPaused = !this.simulationPaused;
  }

  stopSimulation() {
    // Implement the logic to stop the simulation
    this.simulationPaused = false;
  }
}


