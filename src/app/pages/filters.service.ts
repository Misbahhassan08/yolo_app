import { Injectable } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { baseApiUrl } from 'src/config';
import { FilterItem } from '../interface/Filters';
import { Detections } from '../interface/Detections';


@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  get_filters_api_url = baseApiUrl + '/api/filters';
  get_detection_api_url = baseApiUrl+ "/api/detection_list"

  filters: FilterItem[]= [];
  detections: Detections[]=[]

  constructor(private apiServices: RestApiService) {
    // this.getFilters();
  }

  async getDetections(): Promise<Detections[]> {
    if (this.filters.length === 0) {
      console.log('sending detection request');
      await this.apiServices.getRequest(this.get_detection_api_url).toPromise()
        .then((response: Detections[]) => {
          this.detections = response;
        })
        .catch((error: any) => {
          console.error(error); 
        });
      }
      console.log(this.filters, 'in detection func');
      return this.detections;
  }

  async getFilters(): Promise<FilterItem[]> {
    if (this.filters.length === 0) {
      console.log('sending filter request');
      await this.apiServices.getRequest(this.get_filters_api_url).toPromise()
        .then((response: FilterItem[]) => {
          this.filters = response;
        })
        .catch((error: any) => {
          console.error(error); 
        });
      }
      console.log(this.filters, 'in filter func');
      return this.filters;
  }

  updateFilters(newFilters:FilterItem[]){
    this.filters= newFilters
    console.log('Updated filters:', this.filters);
    console.log('original filters:', this.filters);
    
  }
}
