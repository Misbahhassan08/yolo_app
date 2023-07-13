import { Injectable } from '@angular/core';
import { baseApiUrl } from 'src/config';
import { RestApiService } from '../services/rest-api.service';
import { FiltersService } from './filters.service';
import { FilterItem } from '../interface/Filters';
import { HistoryItem } from '../interface/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  get_history_api_url = baseApiUrl + '/api/history_list';

  history: HistoryItem[]=[]

  constructor(private apiServices: RestApiService, private filters: FiltersService) {}

  async getHistory(): Promise<HistoryItem[]> {
    if (this.history.length === 0) {
      console.log('sending filter request');
      await this.apiServices
        .getRequest(this.get_history_api_url)
        .toPromise()
        .then((response: HistoryItem[]) => {
          this.history = response;
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
    console.log(this.history, 'history Data');
    return this.history;
  }
}
