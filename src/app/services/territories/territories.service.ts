import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TerritoryAPIResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TerritoriesService {
  constructor(private http: HttpClient) {}

  getTerritories() {
    const url = `${environment.apiUrl}/Territories/All`;

    return this.http.get(
      `${
        environment.production
          ? environment.proxyUrl + encodeURIComponent(url)
          : url
      }`
    ) as Observable<TerritoryAPIResponse>;
  }
}
