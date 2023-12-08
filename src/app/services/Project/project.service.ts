import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { DigitalTwinProjectContract, Project, CreateProjectCommand } from '../../models/digital-twin-project-contract.model';
import { BaseDigitalTwin, BaseDigitalTwinGet } from '../../models/digital-twin';

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

  getProjects(): Observable<Project[]> {
    const url = `${this.apiUrl}/Project`;
    return this.httpService.get<Project[]>(url);
  }

  updateProject(projectId: number, project: any): Observable<any> {
    const url = `Project/${projectId}`;
    return this.httpService.put(`${this.apiUrl}/${url}`, project);
  }

  deleteProject(projectId: number): Observable<any> {
    const url = `Project/${projectId}`;
    return this.httpService.delete(`${this.apiUrl}/${url}`);
  }

  getDigitalTwinsByProjectId(projectId: number): Observable<BaseDigitalTwinGet[]> {
    const url = `${this.apiUrl}/getDigitalTwin/${projectId}/`;
    return this.httpService.get<BaseDigitalTwinGet[]>(url);
  }
}
