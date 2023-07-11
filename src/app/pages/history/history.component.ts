import { Component, OnInit } from '@angular/core';
import { baseApiUrl } from 'src/config';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  get_filters = baseApiUrl + '/api/filters';
  filters: any;
  constructor(private filtersService: FiltersService) {}

  ngOnInit() {
    this.filtersService.getFilters().then((result) => {
      this.filters=result
    }).catch((err) => {
      console.error(err);
    });

  }
}
 