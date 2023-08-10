import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TerritoryAPIResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TerritoriesService {
  constructor(private http: HttpClient) {}

  getTerritories() {
    return this.http.get(
      `/api/Territories/All`
    ) as Observable<TerritoryAPIResponse>;
  }
}
