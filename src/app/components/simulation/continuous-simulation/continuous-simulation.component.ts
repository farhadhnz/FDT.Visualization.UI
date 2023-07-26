import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SimulationService } from '../../../services/simulation.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, interval, take, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-continuous-simulation',
  templateUrl: './continuous-simulation.component.html',
  styleUrls: ['./continuous-simulation.component.css']
})
export class ContinuousSimulationComponent implements OnInit  {

  constructor(private route: ActivatedRoute,
    private simulationService: SimulationService,
    private cdRef: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.digitalTwinId = Number(params.get('id'));
    })
    this.simulatorId = 0;
  }

  digitalTwinId: number;
  simulatorId: number;
  windSpeeds: any;
  powerOutputs: any;
  currentIndex: number;
  isPaused: boolean;
  private pauseSimulation$ = new Subject<void>();
  simulationId: string;

  startContinuousSimulation(): void {
    this.simulationService.startContinuousSimulation(this.digitalTwinId, this.simulatorId).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.simulationId = response.simulationId;
        this.currentIndex = 0; // Reset the currentIndex when the simulation starts
        this.isPaused = false; // Set the simulation state to running

        this.windSpeeds = []; // Initialize the wind speeds array
        this.powerOutputs = []; // Initialize the power outputs array
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  
    interval(1000)
      .pipe(
        takeWhile(() => !this.isPaused), // Continue the interval until the simulation is paused
        takeUntil(this.pauseSimulation$) // Stop the interval when the pauseSimulation$ subject emits a value
      )
      .subscribe(() => {
        this.simulationService.getContinuousData(this.simulationId, this.currentIndex).subscribe({
          next: (response: any) => {
            const windSpeed = response.windSpeed;
            const powerOutput = response.powerOutput;
  
            this.windSpeeds.push({ x: this.currentIndex + 1, y: windSpeed });
            this.powerOutputs.push({ x: this.currentIndex + 1, y: powerOutput });
  
            this.currentIndex++;

            // Trigger change detection manually after pushing the new item
            this.cdRef.detectChanges();
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete') 
        });
      });
  }
  
  pauseSimulation(): void {
    this.isPaused = true; // Set the simulation state to paused
    this.pauseSimulation$.next(); // Emit a value to stop the interval in startContinuousSimulation()
  }
  
  resumeSimulation(): void {
    this.isPaused = false; // Set the simulation state to running
    this.pauseSimulation$.next(); // Emit a value to stop the pauseObservable in startContinuousSimulation()
  
    interval(1000)
      .pipe(
        takeWhile(() => !this.isPaused), // Continue the interval until the simulation is paused
        takeUntil(this.pauseSimulation$) // Stop the interval when the pauseSimulation$ subject emits a value
      )
      .subscribe(() => {
        this.simulationService.getContinuousData(this.simulationId, this.currentIndex).subscribe({
          next: (response: any) => {
            const windSpeed = response.windSpeed;
            const powerOutput = response.powerOutput;
  
            this.windSpeeds.push({ x: this.currentIndex + 1, y: windSpeed });
            this.powerOutputs.push({ x: this.currentIndex + 1, y: powerOutput });
  
            this.currentIndex++;
            this.cdRef.detectChanges(); // Update the view
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete')
        });
      });
  }
  
  
  stopSimulation(): void {
    this.isPaused = true; // Set the simulation state to paused
    this.currentIndex = 0; // Reset the currentIndex
    this.windSpeeds = []; // Clear the windSpeeds array
    this.powerOutputs = []; // Clear the powerOutputs array
    this.pauseSimulation$.next(); // Emit a value to stop the interval in startContinuousSimulation()
  }
}
