import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SimulationService } from '../../../services/simulation.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, filter, interval, merge, take, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-continuous-simulation',
  templateUrl: './continuous-simulation.component.html',
  styleUrls: ['./continuous-simulation.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
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
  private simulationControl$ = new Subject<'start' | 'pause' | 'resume'>();

  startContinuousSimulation(): void {
    this.simulationService.startContinuousSimulation(this.digitalTwinId, this.simulatorId).subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.simulationId = response.simulationId;
        this.currentIndex = 0; 
        this.isPaused = false; 

        this.windSpeeds = [];
        this.powerOutputs = [];
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  
    merge(
      interval(1000).pipe(filter(() => !this.isPaused)),
      this.simulationControl$
    ).pipe(
      takeUntil(this.pauseSimulation$)
    )
    .subscribe(action => {
      if (action === 'pause') {
        this.isPaused = true;
      } else if (action === 'resume') {
        this.isPaused = false;
      } else if (!this.isPaused) {
        this.fetchSimulationData();
      }
    });
  }

  fetchSimulationData(): void {
    this.simulationService.getContinuousData(this.simulationId, this.currentIndex).subscribe({
      next: (response: any) => {
        this.windSpeeds = [...this.windSpeeds, { x: this.currentIndex + 1, y: response.windSpeed }];
        this.powerOutputs = [...this.powerOutputs, { x: this.currentIndex + 1, y: response.powerOutput }];

        this.currentIndex++;
        
        this.cdRef.detectChanges();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  
  pauseSimulation(): void {
    this.isPaused = true;
    this.simulationControl$.next('pause');
  }
  
  resumeSimulation(): void {
    this.isPaused = false;
    this.simulationControl$.next('resume');
  }
  
  
  stopSimulation(): void {
    this.isPaused = false;
    this.currentIndex = 0;
    this.windSpeeds = [];
    this.powerOutputs = [];
    this.pauseSimulation$.next();
  }
}
