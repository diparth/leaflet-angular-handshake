import { Injectable } from '@angular/core';
import { GeoJSONFeature } from './marker.service';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  public makeCapitalPopups(data: GeoJSONFeature): string {
    return `<div>Capital: ${data.properties.name}</div>
            <div>State: ${data.properties.state}</div>
            <div>Population: ${data.properties.population}</div>`;
  }
}
