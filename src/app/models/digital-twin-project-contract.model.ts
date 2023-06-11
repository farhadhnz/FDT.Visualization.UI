export interface DigitalTwinProjectContract {
    projectName: string;
    projectType: number;
  }

  export interface CreateProjectCommand {
    project: DigitalTwinProjectContract;
  }