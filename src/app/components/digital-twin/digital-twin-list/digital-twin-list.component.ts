import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseDigitalTwinGet } from '../../../models/digital-twin';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/Project/project.service';
import { SplService } from 'src/app/services/spl.service';
import { WindTurbineMapComponent } from '../wind-turbine-map/wind-turbine-map.component';

@Component({
  selector: 'app-digital-twin-list',
  templateUrl: './digital-twin-list.component.html',
  styleUrls: ['./digital-twin-list.component.css']
})
export class DigitalTwinListComponent implements OnInit {
  @ViewChild(WindTurbineMapComponent) private mapComponent!: WindTurbineMapComponent;
  projectId: number;
  digitalTwins: BaseDigitalTwinGet[];
  isMarkerCreationEnabled = false;
  MAX_SIMULATION_RADIUS = 1000;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private splService: SplService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('projectId'));
      this.loadDigitalTwins();
    });
  }

  loadDigitalTwins() {
    this.projectService
      .getDigitalTwinsByProjectId(this.projectId)
      .subscribe(digitalTwins => {
        this.digitalTwins = digitalTwins;
      });
  }

  toggleMarkerCreation() {
    this.isMarkerCreationEnabled = !this.isMarkerCreationEnabled;

    if (this.isMarkerCreationEnabled) {
      // this.map.getContainer().style.cursor = 'crosshair';
    } else {
      // this.map.getContainer().style.cursor = 'grab';
    }
  }

  startSimulation() {
    let heatmapData: { lat: number | null; lng: number | null; intensity: number; }[] = [];

    for (let i = 0; i < this.digitalTwins.length; i++) {
      let digitalTwin = this.digitalTwins[i];
      
    // Assuming this.digitalTwin contains the properties of the wind turbine
    const latProperty = digitalTwin?.properties.find(prop => prop.propertyName === 'latitude');
    const lngProperty = digitalTwin?.properties.find(prop => prop.propertyName === 'longitude');
    const turbinePowerProperty = digitalTwin?.properties.find(x => x.propertyName === 'powerRating');
    const rotorDiameterProperty = digitalTwin?.properties.find(x => x.propertyName === 'rotorDiameter');
    const hubHeightProperty = digitalTwin?.properties.find(x => x.propertyName === 'hubHeight');

    // Extract values and convert them to numbers
    const lat = latProperty ? parseFloat(latProperty.propertyValue.toString()) : null;
    const lng = lngProperty ? parseFloat(lngProperty.propertyValue.toString()) : null;
    const turbinePower = turbinePowerProperty ? parseFloat(turbinePowerProperty.propertyValue.toString()) : 0;
    const rotorDiameter = rotorDiameterProperty ? parseFloat(rotorDiameterProperty.propertyValue.toString()) : 0;
    const hubHeight = hubHeightProperty ? parseFloat(hubHeightProperty.propertyValue.toString()) : 0;
    
    const windSpeeds = Array.from({ length: 1000 }, () => Math.random() * 45 + 5);

    // interval(1000).pipe(
    //   take(windSpeeds.length),
    //   switchMap(index => of(windSpeeds[index]))
    // ).subscribe(windSpeed => {
    for (let r = 1; r <= this.MAX_SIMULATION_RADIUS; r += 10) {
      let intensity = this.splService.calculateSPL(rotorDiameter, turbinePower, windSpeeds[Math.floor(r / 10)], r, hubHeight);
      
      // Convert radius to degrees
      let deltaLat = r / 111000; // Convert radius to degrees for latitude
      let deltaLng = lat === null ? 0 : r / (111000 * Math.cos(lat * Math.PI / 180)); // Adjust for longitude
      // Generate points around the circle
      for (let angle = 0; angle < 360; angle += 10) { // Adjust the angle step as needed
          let latWithR = lat === null ? null : lat + deltaLat * Math.cos(angle * Math.PI / 180);
          let lngWithR = lng === null ? null : lng + deltaLng * Math.sin(angle * Math.PI / 180);
  
          heatmapData.push({
              lat: latWithR, 
              lng: lngWithR, 
              intensity: intensity
          });
      }
    }
  // });
      
    if (this.mapComponent) {
      this.mapComponent.updateHeatmap(heatmapData);
    }
  }

  }
  
  
  stopSimulation() {
    if (this.mapComponent) {
      this.mapComponent.removeHeatmap();
    }
  }
}
