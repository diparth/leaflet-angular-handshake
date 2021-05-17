import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  public capitalsUrl: string = '/assets/data/usa-capitals.json';

  constructor(private http: HttpClient, private popupService: PopupService) { }

  public makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitalsUrl).subscribe((result: GeoJSON) => {
      for (let c of result.features) {
        const log = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];

        let marker = L.marker([ lat, log ]);
        marker.bindPopup(this.popupService.makeCapitalPopups(c));
        marker.addTo(map);
      }
    });
  }

  public makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.capitalsUrl).subscribe((result: GeoJSON) => {
      for (let c of result.features) {
        const log = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];

        let circleMarker = L.circleMarker([ lat, log ], {
          radius: 20 * (c.properties.population / 999000)
        });
        circleMarker.bindPopup(this.popupService.makeCapitalPopups(c));
        circleMarker.addTo(map);
      }
    });
  }
}

export interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

export interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    state: string;
    name: string;
    population: number;
  }
}
