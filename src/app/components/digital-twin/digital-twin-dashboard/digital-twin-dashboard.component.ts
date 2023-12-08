import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, of, switchMap, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseDigitalTwinGet } from 'src/app/models/digital-twin';
import { DigitalTwinService } from 'src/app/services/DigitalTwin/digital-twin.service';
import { WindTurbineMapComponent } from '../wind-turbine-map/wind-turbine-map.component';
import { SplService } from 'src/app/services/spl.service';

@Component({
  selector: 'app-digital-twin-dashboard',
  templateUrl: './digital-twin-dashboard.component.html',
  styleUrls: ['./digital-twin-dashboard.component.css']
})
export class DigitalTwinDashboardComponent implements OnInit {
  @ViewChild(WindTurbineMapComponent) private mapComponent!: WindTurbineMapComponent;
  digitalTwinId: number;
  digitalTwins: BaseDigitalTwinGet[] = [];
  digitalTwin?: BaseDigitalTwinGet;
  isMarkerCreationEnabled = false;
  MAX_SIMULATION_RADIUS = 1000;

  constructor(
    private route: ActivatedRoute,
    private dtService: DigitalTwinService,
    private splService: SplService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.digitalTwinId = Number(params.get('digitalTwinId'));
      this.loadDigitalTwin();
    });
  }
  
  loadDigitalTwin() {
    this.dtService
      .getDigitalTwinById(this.digitalTwinId)
      .subscribe(digitalTwin => {
        this.digitalTwin = digitalTwin;
        this.digitalTwins.push(digitalTwin);
      });
  }

  simulateNoise(){

  }

  startSimulation() {
    let heatmapData: { lat: number | null; lng: number | null; intensity: number; }[] = [];

    const latProperty = this.digitalTwin?.properties.find(prop => prop.propertyName === 'latitude');
    const lngProperty = this.digitalTwin?.properties.find(prop => prop.propertyName === 'longitude');
    const turbinePowerProperty = this.digitalTwin?.properties.find(x => x.propertyName === 'powerRating');
    const rotorDiameterProperty = this.digitalTwin?.properties.find(x => x.propertyName === 'rotorDiameter');
    const hubHeightProperty = this.digitalTwin?.properties.find(x => x.propertyName === 'hubHeight');

    const lat = latProperty ? parseFloat(latProperty.propertyValue.toString()) : null;
    const lng = lngProperty ? parseFloat(lngProperty.propertyValue.toString()) : null;
    const turbinePower = turbinePowerProperty ? parseFloat(turbinePowerProperty.propertyValue.toString()) : 0;
    const rotorDiameter = rotorDiameterProperty ? parseFloat(rotorDiameterProperty.propertyValue.toString()) : 0;
    const hubHeight = hubHeightProperty ? parseFloat(hubHeightProperty.propertyValue.toString()) : 0;
    
    const windSpeeds = Array.from({ length: 1000 }, () => Math.random() * 45 + 5);

    for (let r = 1; r <= this.MAX_SIMULATION_RADIUS; r += 10) {
      let intensity = this.splService.calculateSPL(rotorDiameter, turbinePower, windSpeeds[Math.floor(r / 10)], r, hubHeight);
      console.log(intensity);
      
      let deltaLat = r / 111000; 
      let deltaLng = lat === null ? 0 : r / (111000 * Math.cos(lat * Math.PI / 180)); 

      for (let angle = 0; angle < 360; angle += 10) { 
          let latWithR = lat === null ? null : lat + deltaLat * Math.cos(angle * Math.PI / 180);
          let lngWithR = lng === null ? null : lng + deltaLng * Math.sin(angle * Math.PI / 180);
  
          heatmapData.push({
              lat: latWithR, 
              lng: lngWithR, 
              intensity: intensity
          });
      }
    }
      
    if (this.mapComponent) {
      this.mapComponent.updateHeatmap(heatmapData);
    }
  }
  
  
  stopSimulation() {
    if (this.mapComponent) {
      this.mapComponent.removeHeatmap();
    }
  }
}
