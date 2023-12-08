export interface DigitalTwin {
    id: number;
    name: string;
}

export interface BaseDigitalTwin {
    id?: number;
    name: string;
    description: string;
    dateCreated?: Date;
    dateModified?: Date;
    projectId: number;
    digitalTwinTypeId: number;
    properties: { [key: string]: object };
  }

  export interface BaseDigitalTwinGet {
    id?: number;
    name: string;
    description: string;
    dateCreated?: Date;
    dateModified?: Date;
    projectId: number;
    digitalTwinTypeId: number;
    properties: DigitalTwinProperty[];
  }
  
  export interface CreateDigitalTwinCommand {
    digitalTwinModel: BaseDigitalTwin;
  }

  export interface DigitalTwinProperty {
    propertyName: string;
    propertyValue: string | number;
  }