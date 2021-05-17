import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) { }

  public getStateShapes(): Observable<any> {
    return this.http.get('/assets/data/gz_2010_us_040_00_5m.json');
  }
}
