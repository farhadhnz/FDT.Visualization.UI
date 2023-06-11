import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { DigitalTwinProjectContract, CreateProjectCommand } from '../../models/digital-twin-project-contract.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl: string;

  constructor(private httpService: HttpService) {
    this.apiUrl = environment.apiUrl;
  }

  createProject(project: DigitalTwinProjectContract): Observable<any> {
    const createProjectCommand: CreateProjectCommand = {
      project: project
    };
    const createProjectUrl = `${this.apiUrl}/createProject`;
    return this.httpService.post(createProjectUrl, createProjectCommand);
  }
}
