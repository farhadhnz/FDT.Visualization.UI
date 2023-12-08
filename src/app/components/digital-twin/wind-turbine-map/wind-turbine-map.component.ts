import { Component, OnInit, AfterViewInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { latLng } from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { BaseDigitalTwinGet } from 'src/app/models/digital-twin';
declare var HeatmapOverlay:any;

@Component({
  selector: 'app-wind-turbine-map',
  templateUrl: './wind-turbine-map.component.html',
  styleUrls: ['./wind-turbine-map.component.css']
})
export class WindTurbineMapComponent implements OnInit, AfterViewInit, OnChanges {

  private map!: L.Map;
  private legend: L.Control;
  isMarkerCreationEnabled = false;
  @Input() digitalTwins!: BaseDigitalTwinGet[];
  markers: L.Marker[] = [];
  heatmapLayer: L.Layer;
  

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['digitalTwins'] && changes['digitalTwins'].currentValue) {

      
      this.initializeMarkers();
    }
  }

  private initializeMarkers() {
    if (this.digitalTwins) {
      this.setupMarkers();

      if (this.map) {
        this.addMarkers();
        this.centerMap();
      }
    }
  }
  
  ngOnInit() {

    if (this.digitalTwins) {
      this.setupMarkers();
    }
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
    this.addLegend();
  }

  private setupMarkers() {
    const turbineIcon = L.icon({
      iconUrl: '../../../assets/icons/w-icon.png',
      iconSize: [38, 38], 
      iconAnchor: [20, 40], 
      popupAnchor: [0, 0] 
    });

    this.markers = this.digitalTwins
    .map(dt => {
      const latProperty = dt.properties.find(prop => prop.propertyName === 'latitude');
      const lngProperty = dt.properties.find(prop => prop.propertyName === 'longitude');

      const lat = latProperty ? parseFloat(latProperty.propertyValue.toString()) : null;
      const lng = lngProperty ? parseFloat(lngProperty.propertyValue.toString()) : null;

      return (lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) ? 
        L.marker([lat, lng], {icon: turbineIcon}) : null;
    })
    .filter((marker): marker is L.Marker => marker !== null); // Remove null values
  }


  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private addMarkers() {
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    this.map.fitBounds(bounds);
  }

  private addLegend(): void {
    this.legend = new L.Control({ position: 'bottomright' });

    this.legend.onAdd = (map) => {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = this.calculateGrades(0, 54), // intensity levels
          labels = [];

      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background:' + this.getColor(grades[i] + 1, 0, 54) + '"> ' 
          + grades[i].toFixed(2) + (grades[i + 1] ? '&ndash;' + grades[i + 1].toFixed(2) : '+') + '</i>');
          
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };

    this.legend.addTo(this.map);
  }

  private calculateGrades(min: number, max: number): number[] {
    let range = max - min;
    let step = range / 7; // Dividing the range into seven equal parts
    let grades = [];
  
    for (let i = 0; i <= 7; i++) {
      grades.push(min + step * i);
    }
  
    return grades;
  }

  private getColor(value: number, min: number, max: number): string {
    const normalizedValue = (value - min) / (max - min);
  
    const hue = 240 - normalizedValue * 240;
  
    return `hsl(${hue}, 100%, 50%)`;
  }
  
  public updateHeatmap(heatmapData: any) {
    let newAddressPoints = heatmapData.map((p: any) => [p.lat, p.lng, p.intensity]);

    if (this.heatmapLayer) {
      this.map.removeLayer(this.heatmapLayer);
    }

    this.heatmapLayer = (L as any).heatLayer(newAddressPoints, {
      max: 1, 
      "scaleRadius": false,
      radius: 10,
      "useLocalExtrema": true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'intensity',
    }).addTo(this.map);
    
  }

  removeHeatmap() {
    if (this.heatmapLayer) {
      this.map.removeLayer(this.heatmapLayer);
    }
    
  }
}