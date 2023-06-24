export interface DigitalTwinProjectContract {
    projectName: string;
    projectType: number;
  }

  export interface Project {
    projectName: string;
    projectType: number;
    id: number;
  }

  export interface CreateProjectCommand {
    project: DigitalTwinProjectContract;
  }