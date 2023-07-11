import { Component, OnInit } from '@angular/core';
import { baseApiUrl } from 'src/config';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-configration',
  templateUrl: './configration.component.html',
  styleUrls: ['./configration.component.css'],
  providers: [
    {
      provide: FiltersService,
      useClass: FiltersService,
    },
  ],
})
export class ConfigrationComponent implements OnInit {
  get_filters = baseApiUrl + '/api/filters';
  filters: any;
  constructor(
   private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.filtersService.getFilters().then((filters) => {
      this.filters = filters;
      // console.log(this.filters, 'filters in component');
    });
  }

  saveNewFilters() {
    this.filtersService.updateFilters(this.filters)
  }
}
