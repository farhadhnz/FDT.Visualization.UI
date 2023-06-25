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
}
