import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker.service';
import { ShapeService } from 'src/app/services/shape.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  public map: L.Map;
  public states: any;

  constructor(private markerService: MarkerService, private shapeService: ShapeService) { }

  ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.initMap();

    this.markerService.makeCapitalCircleMarkers(this.map);
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      zoom: 4,
      center: [39.8282, -98.5795]
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private initStatesLayer(): void {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => {
        return {
          weight: 3,
          opacity: 0.5,
          color: '#008f68',
          fillOpacity: 0.5,
          fillColor: '#6DB65B'
        }
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => this.highlightFeature(e),
          mouseout: (e) => this.resetFeature(e)
        })
      }
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  private highlightFeature(e): void {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.7,
      color: '#DFA612',
      fillOpacity: 0.7,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e): void {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.5,
      fillColor: '#6DB65B'
    });
  }
}
