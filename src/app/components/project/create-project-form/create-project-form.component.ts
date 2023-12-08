import { Component } from '@angular/core';
import { ProjectService } from '../../../services/Project/project.service';
import { DigitalTwinProjectContract } from '../../../models/digital-twin-project-contract.model';
import { ProjectType } from '../../../models/project-type';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.css']
})
export class CreateProjectFormComponent {
  showForm: boolean;
  project: DigitalTwinProjectContract = {
    projectName: '',
    projectType: 1
  };

  constructor(private apiService: ProjectService) { }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
  }

  public projectTypes: ProjectType[] = [
    { name: 'Wind Turbine', value: 1 }
    // Add more project types as needed
  ];

  onSubmit(): void {
    this.apiService.createProject(this.project).subscribe({
      next: () => {
        // Handle success
        console.log('Project created successfully');
        this.toggleFormVisibility()
      },
      error: (error) => {
        // Handle error
        console.error('Failed to create project:', error);
      }
    });
  }
}
