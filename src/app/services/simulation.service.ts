import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private apiUrl: string;

  constructor(private httpService: HttpService) {
    this.apiUrl = environment.apiUrl;
  }

  startSimulation(digitalTwinId: number, simulatorId: number): Observable<any> {
    const simulationUrl = `${this.apiUrl}/Simulation/${digitalTwinId}/${simulatorId}`;
    const requestBody = { digitalTwinId, simulatorId };
    return this.httpService.post(simulationUrl, requestBody);
  }

  startContinuousSimulation(digitalTwinId: number, simulatorId: number): Observable<any> {
    const simulationUrl = `${this.apiUrl}/Simulation/continuous/start/${digitalTwinId}/${simulatorId}`;
    const requestBody = { digitalTwinId, simulatorId };
    return this.httpService.post(simulationUrl, requestBody);
  }

  pauseContinuousSimulation() {
    const url = `${this.apiUrl}/simulation/continuous/pause`;
    return this.httpService.post(url, {});
  }

  resumeContinuousSimulation() {
    const url = `${this.apiUrl}/simulation/continuous/resume`;
    return this.httpService.post(url, {});
  }

  stopContinuousSimulation() {
    const url = `${this.apiUrl}/simulation/continuous/stop`;
    return this.httpService.post(url, {});
  }

  getContinuousData(simulationId: string, index: number) {
    const url = `${this.apiUrl}/simulation/continuous/data/${simulationId}/${index}`;
    return this.httpService.get(url);
  }

}

