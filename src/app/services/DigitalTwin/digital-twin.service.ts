import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpService } from '../http.service';
import { BaseDigitalTwinGet } from 'src/app/models/digital-twin';

@Injectable({
  providedIn: 'root'
})
export class DigitalTwinService {

  private apiUrl: string;

  constructor(private httpService: HttpService) {
    this.apiUrl = environment.apiUrl;
  }

  createDigitalTwin(digitalTwinData: any): Observable<any> {
    const url = `${this.apiUrl}/CreateDigitalTwin`;
    return this.httpService.post(url, digitalTwinData);
  }

  getDigitalTwinById(digitalTwinId: number): Observable<any> {
    const url = `${this.apiUrl}/dt/` + digitalTwinId;
    return this.httpService.get(url);
  }
}
