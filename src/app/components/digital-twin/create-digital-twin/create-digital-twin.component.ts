import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { CreateDigitalTwinCommand } from 'src/app/models/digital-twin';
import { DigitalTwinService } from 'src/app/services/DigitalTwin/digital-twin.service';

@Component({
  selector: 'app-create-digital-twin',
  templateUrl: './create-digital-twin.component.html',
  styleUrls: ['./create-digital-twin.component.css']
})
export class CreateDigitalTwinComponent implements OnInit, AfterViewInit {
  @Input() projectId!: number;
  private map!: L.Map;
  selectedLocation: L.LatLng | undefined;
  digitalTwinForm: FormGroup;
  currentCoords = { lat: 0, lng: 0 };

  constructor(private formBuilder: FormBuilder,
    private digitalTwinService: DigitalTwinService) {
      this.digitalTwinForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        powerRating: [null],
        hubHeight: [null],
        rotorDiameter: [null],
        latitude: [null],
        longitude: [null]
      });
     }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer(baseMapURl).addTo(this.map);

    this.map.getContainer().style.cursor = 'crosshair';

    // Map click event to get lat, lng
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.selectedLocation = e.latlng;

      this.digitalTwinForm.patchValue({
        latitude: this.selectedLocation.lat,
        longitude: this.selectedLocation.lng
      });

      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
      L.marker(this.selectedLocation).addTo(this.map);
    });

    this.map.on('mousemove', (e: L.LeafletMouseEvent) => {
      this.currentCoords = e.latlng;
    });
  }


  onMapMouseMove(e: L.LeafletMouseEvent): void {
    this.currentCoords = e.latlng;
  }

  onSubmit() {
    if (this.digitalTwinForm.valid) {
      const formValues = this.digitalTwinForm.value;
  
      const digitalTwinData: CreateDigitalTwinCommand = {
        digitalTwinModel: {
          name: formValues.name,
          description: formValues.description,
          properties: {
            powerRating: formValues.powerRating,
            hubHeight: formValues.hubHeight,
            rotorDiameter: formValues.rotorDiameter,
            latitude: formValues.latitude,
            longitude: formValues.longitude,
          },
          projectId: this.projectId,
          digitalTwinTypeId: 1
        }
      };

    this.digitalTwinService.createDigitalTwin(digitalTwinData).subscribe(
      response => {
        console.log('Digital Twin Created:', response);
      },
      error => {
        console.error('Error Creating Digital Twin:', error);
      }
    );
  }
}

}