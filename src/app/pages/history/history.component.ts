import { Component, OnInit } from '@angular/core';
import { baseApiUrl } from 'src/config';
import { FiltersService } from '../filters.service';
import { HistoryService } from '../history.service';
import { HistoryItem } from 'src/app/interface/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  get_filters = baseApiUrl + '/api/filters';
  filters: any;
  history: HistoryItem[] = []
  filteredHistory: HistoryItem[] = []
  expandedCard: any

  constructor(private filtersService: FiltersService, private historysService: HistoryService) {}

  ngOnInit() {
    this.filtersService.getFilters().then((result) => {
      this.filters=result
    }).catch((err) => {
      console.error(err);
    });

    this.historysService.getHistory().then((result) => {
      this.history=result
      this.filterHistory()
    }).catch((err) => {
      console.error(err);
    })    

  }

  filterHistory() {
    // console.log('filter detection function');

    for (const filter of this.filters) {
      if (filter.clicked === true) {
        const detection = this.history.find((d) => d.id === filter.id);
        if (detection) {
          // console.log(detection, "in filterdetection", filter);
          this.filteredHistory.push(detection);
        }
      }
    }
    console.log(this.filteredHistory, "this is filtered history");
    
  }

  expandCard(data: any) {
    this.expandedCard = data;
  }

  closeCard() {
    this.expandedCard = null;
  }
}
 