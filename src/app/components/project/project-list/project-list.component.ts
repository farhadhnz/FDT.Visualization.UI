import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/digital-twin-project-contract.model'
import { ProjectService } from "../../../services/Project/project.service";
import { ProjectType } from '../../../models/project-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService,
    private router: Router) { }

  public projectTypes: ProjectType[] = [
    { name: 'Wind Turbine', value: 1 }
    // Add more project types as needed
  ];

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getProjectTypeLabel(projectType: number): string {
    const foundType = this.projectTypes.find(type => type.value === projectType);
    return foundType ? foundType.name : '';
  }

  openProject(project: Project): void {
    const projectId = project.id;
    this.openDigitalTwins(projectId);
  }

  openDigitalTwins(projectId: number) {
    this.router.navigate([`project/${projectId}/digitalTwins`]);
  }

  deleteProject(projectId: number): void {
    this.projectService.deleteProject(projectId);
    console.log('Deleting project with ID:', projectId);
  }
}
