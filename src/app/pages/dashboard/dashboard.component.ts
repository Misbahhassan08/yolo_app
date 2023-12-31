declare var require: any;
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import ExportingModule from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data'
import { Options } from 'highcharts';
import { FiltersService } from '../filters.service';
import { FilterItem } from 'src/app/interface/Filters';
import { Detections } from 'src/app/interface/Detections';
import { GraphData } from 'src/app/interface/GraphData';


ExportingModule(Highcharts);
ExportData(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Highcharts = Highcharts;
  filters: FilterItem[] = [];
  detections: Detections[] = [];
  filteredDetections: Detections[] = [];
  graphData: any = [];
  showGraph: boolean = false;
  // chartOptions: any;

  constructor(private filterService: FiltersService) {}
  ngOnInit(): void {
    this.filterService
      .getFilters()
      .then((result) => {
        this.filters = result;
        // console.log(this.filters);
      })
      .catch((err) => {
        console.error(err);
      });

    //code to get the detections
    this.filterService
      .getDetections()
      .then((result) => {
        this.detections = result;
        // console.log(this.filters);
        this.filterDetections();
      })
      .catch((err) => {
        console.error(err);
      });

    
  }

  //filter the detections
  filterDetections() {
    // console.log('filter detection function');

    for (const filter of this.filters) {
      if (filter.clicked === true) {
        const detection = this.detections.find((d) => d.id === filter.id);
        if (detection) {
          // console.log(detection, "in filterdetection", filter);
          this.filteredDetections.push(detection);
        }
      }
    }

    this.combineData();
  }

  combineData() {
    for (let filter of this.filteredDetections) {
      this.graphData.push({
        type: 'line',
        name: filter.title,
        data: filter.data,
      });
    }
    // console.log(this.graphData, "this is graph data");
    // console.log(JSON.stringify(this.graphData), 'this is graphData');
    this.showGraph = true;
  }

  // updateChartOptions(){
  //
  // }

  getRandomData() {
    const data: [number, number][] = [];
    const now = Date.now();
    const randomRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    for (let i = 0; i < 100; i++) {
      const timestamp = now + i * 86400000; // One day in milliseconds
      const value = randomRange(100, 200);
      data.push([timestamp, value]);
    }

    return data;
  }

  // chartOptions: any = {
  //       "chart": {
  //         "type": "line"
  //         // Other chart configurations
  //       },
  //       "title": {
  //         "text": "Data Analytics"
  //       },
  //       "xAxis": {
  //         // "categories": ["Category 1", "Category 2", "Category 3"]
  //         // Other xAxis configurations
  //       },
  //       "yAxis": {
  //         "title": {
  //           "text": "Y-Axis Title"
  //         }
  //         // Other yAxis configurations
  //       },
  //       "series": this.graphData
  //       // Other chart options and configurations
  //     }

  chartOptions: Options = {
    rangeSelector: {
      selected: 2,
    },

    exporting: {
      enabled: true, // Enable exporting
      buttons: {
        contextButton: {
          menuItems: [
            'viewFullscreen', // View in full screen
            'printChart', // Print chart
            'separator',
            'downloadPNG', // Download as PNG
            'downloadJPEG', // Download as JPEG
            'downloadPDF', // Download as PDF
            'downloadSVG', // Download as SVG
            'separator',
            'downloadCSV', // Download CSV data
            'downloadXLS', // Download XLS data
            // 'viewData', // View data table
          ]
        }
      }
    },


    title: {
      text: 'Data Analytics',
    },

    legend: {
      enabled: true,
    },

    plotOptions: {
      series: {
        showInLegend: true,
      },
    },

    // series: [
    //   {
    //     type: 'line',
    //     name: 'Car',
    //     data: [
    //       [1528983000000, 191.55, 191.57, 190.22, 190.8],
    //       [1529069400000, 190.03, 190.16, 188.26, 188.84],
    //       [1529328600000, 187.88, 189.22, 187.2, 188.74],
    //       [1529415000000, 185.14, 186.33, 183.45, 185.69],
    //       [1529501400000, 186.35, 187.2, 185.73, 186.5],
    //       [1529587800000, 187.25, 188.35, 184.94, 185.46],
    //       [1529674200000, 186.12, 186.15, 184.7, 184.92],
    //       [1529933400000, 183.4, 184.92, 180.73, 182.17],
    //       [1530019800000, 182.99, 186.53, 182.54, 184.43],
    //       [1530106200000, 185.23, 187.28, 184.03, 184.16],
    //       [1530192600000, 184.1, 186.21, 183.8, 185.5],
    //       [1530279000000, 186.29, 187.19, 182.91, 185.11],
    //       [1530538200000, 183.82, 187.3, 183.42, 187.18],
    //       [1530624600000, 187.79, 187.95, 183.54, 183.92],
    //       [1530797400000, 185.26, 186.41, 184.28, 185.4],
    //       [1530883800000, 185.42, 188.43, 185.2, 187.97],
    //       [1531143000000, 189.5, 190.68, 189.3, 190.58],
    //       [1531229400000, 190.71, 191.28, 190.18, 190.35],
    //       [1531315800000, 188.5, 189.78, 187.61, 187.88],
    //       [1531402200000, 189.53, 191.41, 189.31, 191.03],
    //       [1531488600000, 191.08, 191.84, 190.9, 191.33],
    //       [1531747800000, 191.52, 192.65, 190.42, 190.91],
    //       [1531834200000, 189.75, 191.87, 189.2, 191.45],
    //       [1531920600000, 191.78, 191.8, 189.93, 190.4],
    //       [1532007000000, 189.69, 192.55, 189.69, 191.88],
    //       [1532093400000, 191.78, 192.43, 190.17, 191.44],
    //       [1532352600000, 190.68, 191.96, 189.56, 191.61],
    //       [1532439000000, 192.45, 193.66, 192.05, 193],
    //       [1532525400000, 193.06, 194.85, 192.43, 194.82],
    //       [1532611800000, 194.61, 195.96, 193.61, 194.21],
    //       [1532698200000, 194.99, 195.19, 190.1, 190.98],
    //       [1532957400000, 191.9, 192.2, 189.07, 189.91],
    //       [1533043800000, 190.3, 192.14, 189.34, 190.29],
    //       [1533130200000, 199.13, 201.76, 197.31, 201.5],
    //       [1533216600000, 200.58, 208.38, 200.35, 207.39],
    //       [1533303000000, 207.03, 208.74, 205.48, 207.99],
    //       [1533562200000, 208, 209.25, 207.07, 209.07],
    //       [1533648600000, 209.32, 209.5, 206.76, 207.11],
    //       [1533735000000, 206.05, 207.81, 204.52, 207.25],
    //       [1533821400000, 209.53, 209.78, 207.2, 208.88],
    //       [1533907800000, 207.36, 209.1, 206.67, 207.53],
    //       [1534167000000, 209.31, 210.95, 207.7, 208.87],
    //       [1534253400000, 210.16, 210.56, 208.26, 209.75],
    //       [1534339800000, 209.22, 210.74, 208.33, 210.24],
    //       [1534426200000, 211.75, 213.81, 211.47, 213.32],
    //       [1534512600000, 213.44, 217.95, 213.16, 217.58],
    //       [1534771800000, 218.1, 219.18, 215.11, 215.46],
    //       [1534858200000, 216.8, 217.19, 214.03, 215.04],
    //       [1534944600000, 214.1, 216.36, 213.84, 215.05],
    //       [1535031000000, 214.65, 217.05, 214.6, 215.49],
    //       [1535117400000, 216.6, 216.9, 215.11, 216.16],
    //       [1535376600000, 217.15, 218.74, 216.33, 217.94],
    //       [1535463000000, 219.01, 220.54, 218.92, 219.7],
    //       [1535549400000, 220.15, 223.49, 219.41, 222.98],
    //       [1535635800000, 223.25, 228.26, 222.4, 225.03],
    //       [1535722200000, 226.51, 228.87, 226, 227.63],
    //       [1536067800000, 228.41, 229.18, 226.63, 228.36],
    //       [1536154200000, 228.99, 229.67, 225.1, 226.87],
    //       [1536240600000, 226.23, 227.35, 221.3, 223.1],
    //       [1536327000000, 221.85, 225.37, 220.71, 221.3],
    //       [1536586200000, 220.95, 221.85, 216.47, 218.33],
    //       [1536672600000, 218.01, 224.3, 216.56, 223.85],
    //       [1536759000000, 224.94, 225, 219.84, 221.07],
    //       [1536845400000, 223.52, 228.35, 222.57, 226.41],
    //       [1536931800000, 225.75, 226.84, 222.52, 223.84],
    //       [1537191000000, 222.15, 222.95, 217.27, 217.88],
    //       [1537277400000, 217.79, 221.85, 217.12, 218.24],
    //       [1537363800000, 218.5, 219.62, 215.3, 218.37],
    //       [1537450200000, 220.24, 222.28, 219.15, 220.03],
    //       [1537536600000, 220.78, 221.36, 217.29, 217.66],
    //       [1537795800000, 216.82, 221.26, 216.63, 220.79],
    //       [1537882200000, 219.75, 222.82, 219.7, 222.19],
    //       [1537968600000, 221, 223.75, 219.76, 220.42],
    //       [1538055000000, 223.82, 226.44, 223.54, 224.95],
    //       [1538141400000, 224.79, 225.84, 224.02, 225.74],
    //       [1538400600000, 227.95, 229.42, 226.35, 227.26],
    //       [1538487000000, 227.25, 230, 226.63, 229.28],
    //       [1538573400000, 230.05, 233.47, 229.78, 232.07],
    //       [1538662700000, 230.78, 232.33, 229.07, 230.15],
    //     ],
    //   },
    //   {
    //     type: 'line',
    //     name: 'Person',
    //     data: [
    //       [1528983000000, 210.1, 212.5, 208.8, 209.6],
    //       [1529069400000, 208.2, 209.4, 207.1, 208.5],
    //       [1529328600000, 205.8, 206.9, 203.6, 204.2],
    //       [1529415000000, 204.9, 205.4, 202.3, 203.1],
    //       [1529501400000, 202.5, 203.7, 200.6, 201.7],
    //       [1529587800000, 201.8, 202.4, 199.1, 199.5],
    //       [1529674200000, 199.2, 200.4, 196.6, 198.5],
    //       [1529933400000, 198.2, 199.8, 194.5, 195.6],
    //       [1530019800000, 196.2, 199.3, 195.1, 197.8],
    //       [1530106200000, 197.9, 199.1, 196.3, 197.5],
    //       [1530192600000, 197.2, 198.7, 195.5, 196.3],
    //       [1530279000000, 196.7, 197.8, 193.1, 194.8],
    //       [1530538200000, 195.5, 197.9, 194.4, 196.5],
    //       [1530624600000, 196.8, 197.4, 193.2, 194.1],
    //       [1530797400000, 194.6, 196.8, 192.9, 195.3],
    //       [1530883800000, 195.8, 198.7, 195.2, 197.6],
    //       [1531143000000, 197.9, 199.2, 196.5, 197.8],
    //       [1531229400000, 198.5, 199.8, 197.2, 199.3],
    //       [1531315800000, 198.7, 199.8, 197.5, 198.5],
    //       [1531402200000, 198.6, 200.4, 197.9, 199.4],
    //       [1531488600000, 199.5, 200.7, 198.9, 199.6],
    //       [1531747800000, 199.4, 200.5, 198.6, 199.8],
    //       [1531834200000, 199.8, 200.6, 198.7, 199.9],
    //       [1531920600000, 199.9, 201.3, 199.5, 200.8],
    //       [1532007000000, 200.8, 202.1, 199.9, 201.4],
    //       [1532093400000, 201.6, 202.8, 200.9, 202.1],
    //       [1532352600000, 202.2, 203.9, 201.5, 202.8],
    //       [1532439000000, 203.3, 205.1, 202.6, 203.9],
    //       [1532525400000, 204.1, 206.3, 203.7, 205.2],
    //       [1532611800000, 205.6, 207.4, 204.6, 206.7],
    //       [1532698200000, 206.8, 208.3, 205.2, 207.6],
    //       [1532957400000, 207.8, 209.6, 206.9, 208.3],
    //       [1533043800000, 208.3, 210.1, 207.9, 209.2],
    //       [1533130200000, 209.2, 211.1, 208.9, 210.5],
    //       [1533216600000, 210.7, 212.4, 209.9, 211.9],
    //       [1533303000000, 212, 214.3, 211.8, 213.8],
    //       [1533562200000, 213.9, 215.4, 213, 214.9],
    //       [1533648600000, 215, 215.8, 213.2, 213.8],
    //       [1533735000000, 213.8, 215.6, 213, 214.4],
    //       [1533821400000, 214.5, 215.9, 213.5, 215.4],
    //       [1533907800000, 215.6, 217.3, 215.1, 216.7],
    //       [1534167000000, 216.8, 218.5, 216.2, 217.8],
    //       [1534253400000, 218, 219.2, 217.5, 218.3],
    //       [1534339800000, 218.4, 220.3, 218, 219.8],
    //       [1534426200000, 219.9, 222.2, 219.5, 221.4],
    //       [1534512600000, 221.5, 222.9, 221.1, 222.2],
    //       [1534771800000, 222.3, 224, 221.7, 223.1],
    //       [1534858200000, 223.3, 224.4, 222.8, 223.7],
    //       [1534944600000, 223.8, 225.2, 223.3, 224.6],
    //       [1535031000000, 224.7, 226.1, 224.3, 225.4],
    //       [1535117400000, 225.5, 227, 225.1, 226.1],
    //       [1535376600000, 226.2, 227.7, 225.8, 226.9],
    //       [1535463000000, 227, 228.5, 226.4, 227.8],
    //       [1535549400000, 227.9, 229.3, 227.2, 228.5],
    //       [1535635800000, 228.6, 229.9, 228.1, 229.3],
    //       [1535722200000, 229.4, 231.2, 229, 230.4],
    //       [1536067800000, 230.5, 231.8, 229.3, 230.9],
    //       [1536154200000, 231, 232.6, 230.3, 231.8],
    //       [1536240600000, 231.9, 233.2, 231.3, 232.7],
    //       [1536327000000, 232.8, 234, 232.2, 233.3],
    //       [1536586200000, 233.4, 234.8, 232.7, 233.9],
    //       [1536672600000, 234, 235.3, 233.5, 234.4],
    //       [1536759000000, 234.5, 236.2, 234.1, 235.4],
    //       [1536845400000, 235.5, 237, 234.8, 236.1],
    //       [1536931800000, 236.2, 237.5, 235.9, 237],
    //       [1537191000000, 237.1, 238.4, 236.7, 237.9],
    //       [1537277400000, 237.9, 239.2, 237.4, 238.7],
    //       [1537363800000, 238.8, 240.1, 238.3, 239.6],
    //       [1537450200000, 239.7, 241, 239.2, 240.5],
    //       [1537536600000, 240.6, 242, 240.3, 241.4],
    //       [1537795800000, 241.5, 242.8, 241.1, 242.2],
    //       [1537882200000, 242.3, 243.6, 242, 243.1],
    //       [1537968600000, 243.2, 244.5, 242.9, 244],
    //       [1538055000000, 244.1, 245.4, 243.8, 244.9],
    //       [1538141400000, 244.9, 246.2, 244.7, 245.7],
    //       [1538400600000, 245.8, 247.1, 245.6, 246.6],
    //       [1538487000000, 246.7, 248, 246.5, 247.5],
    //       [1538573400000, 247.6, 248.9, 247.4, 248.3],
    //       [1538662700000, 248.4, 249.7, 248.3, 249.2],
    //     ],
    //   },
    //   {
    //     type: 'line',
    //     name: 'Bike',
    //     data: [
    //       [1528983000000, 190.5, 191.8, 188.9, 190.3],
    //       [1529069400000, 189.9, 191.1, 189, 189.7],
    //       [1529328600000, 189.8, 190.5, 188.4, 189.1],
    //       [1529415000000, 188.7, 189.2, 187.5, 188.3],
    //       [1529501400000, 188.4, 189.1, 187.6, 188.1],
    //       [1529587800000, 188.2, 189, 187.3, 188],
    //       [1529674200000, 187.9, 188.6, 186.8, 187.4],
    //       [1529933400000, 187.5, 188.2, 186.3, 186.9],
    //       [1530019800000, 187, 188.5, 186.7, 187.8],
    //       [1530106200000, 187.9, 188.7, 186.5, 188.3],
    //       [1530192600000, 188.4, 189.2, 187.7, 188.8],
    //       [1530279000000, 188.9, 189.7, 187.8, 188.9],
    //       [1530538200000, 189, 189.9, 187.6, 188.3],
    //       [1530624600000, 188.4, 188.9, 186.5, 187.5],
    //       [1530797400000, 187.6, 188.7, 186.3, 187.8],
    //       [1530883800000, 187.9, 189.4, 187.5, 189.2],
    //       [1531143000000, 189.3, 190.2, 188.6, 189.9],
    //       [1531229400000, 190, 190.8, 189.1, 190.2],
    //       [1531315800000, 189.9, 190.6, 188.9, 189.3],
    //       [1531402200000, 189.4, 190.7, 189.2, 190.1],
    //       [1531488600000, 190.2, 191, 190, 190.7],
    //       [1531747800000, 190.8, 191.7, 190.1, 191.5],
    //       [1531834200000, 191.6, 192.3, 191, 191.7],
    //       [1531920600000, 191.8, 192.6, 191, 191.4],
    //       [1532007000000, 191.5, 192.4, 190.7, 191.6],
    //       [1532093400000, 191.7, 192.5, 191, 192],
    //       [1532352600000, 192.1, 192.9, 191.2, 192.6],
    //       [1532439000000, 192.7, 193.4, 192, 193],
    //       [1532525400000, 193.1, 194, 192.5, 193.5],
    //       [1532611800000, 193.6, 194.4, 192.9, 193.9],
    //       [1532698200000, 194, 194.8, 193, 193.2],
    //       [1532957400000, 193.3, 194.1, 192.4, 193.6],
    //       [1533043800000, 193.7, 194.8, 193, 194],
    //       [1533130200000, 194.1, 195, 193.5, 194.6],
    //       [1533216600000, 194.7, 195.5, 193.8, 195.1],
    //       [1533303000000, 195.2, 196, 194.6, 195.5],
    //       [1533562200000, 195.6, 196.7, 195, 196.1],
    //       [1533648600000, 196.2, 196.9, 195.5, 196.4],
    //       [1533735000000, 196.5, 197.2, 195.7, 196.8],
    //       [1533821400000, 196.9, 197.7, 196.2, 197.3],
    //       [1533907800000, 197.4, 198.2, 196.6, 197.8],
    //       [1534167000000, 197.9, 198.8, 197.3, 198.2],
    //       [1534253400000, 198.3, 199, 197.5, 198.7],
    //       [1534339800000, 198.8, 199.7, 198.1, 199.2],
    //       [1534426200000, 199.3, 200.1, 198.5, 199.6],
    //       [1534512600000, 199.7, 200.4, 199, 199.9],
    //       [1534771800000, 200, 201, 199.5, 200.4],
    //       [1534858200000, 200.5, 201.2, 199.8, 200.9],
    //       [1534944600000, 201, 202, 200.5, 201.4],
    //       [1535031000000, 201.5, 202.4, 200.9, 201.8],
    //       [1535117400000, 201.9, 202.8, 201.4, 202.3],
    //       [1535376600000, 202.4, 203.5, 201.8, 202.9],
    //       [1535463000000, 203, 203.8, 202.4, 203.3],
    //       [1535549400000, 203.4, 204.3, 202.8, 203.9],
    //       [1535635800000, 204, 204.8, 203.3, 204.4],
    //       [1535722200000, 204.5, 205.4, 204, 204.9],
    //       [1536067800000, 205, 206, 204.5, 205.4],
    //       [1536154200000, 205.5, 206.5, 205, 205.9],
    //       [1536240600000, 206, 206.8, 205.4, 206.3],
    //       [1536327000000, 206.4, 207.2, 205.8, 206.8],
    //       [1536586200000, 206.9, 207.8, 206.3, 207.3],
    //       [1536672600000, 207.4, 208.2, 206.8, 207.8],
    //       [1536759000000, 207.9, 208.7, 207.3, 208.2],
    //       [1536845400000, 208.3, 209.1, 207.7, 208.7],
    //       [1536931800000, 208.8, 209.6, 208.2, 209.1],
    //       [1537191000000, 209.2, 210, 208.6, 209.6],
    //       [1537277400000, 209.7, 210.5, 209.1, 210],
    //       [1537363800000, 210.1, 210.9, 209.5, 210.4],
    //       [1537450200000, 210.5, 211.3, 209.9, 210.9],
    //       [1537536600000, 211, 211.8, 210.4, 211.4],
    //       [1537795800000, 211.5, 212.3, 210.9, 211.9],
    //       [1537882200000, 212, 212.8, 211.4, 212.3],
    //       [1537968600000, 212.4, 213.2, 211.8, 212.8],
    //       [1538055000000, 212.9, 213.7, 212.3, 213.3],
    //       [1538141400000, 213.4, 214.2, 212.8, 213.8],
    //       [1538400600000, 213.9, 214.7, 213.3, 214.2],
    //       [1538487000000, 214.3, 215.1, 213.7, 214.7],
    //       [1538573400000, 214.8, 215.6, 214.2, 215.2],
    //       [1538662700000, 215.3, 216.1, 214.7, 215.7],
    //     ],
    //   },
    // ],
    series: this.graphData,
  };

  logging() {
    console.log(this.chartOptions, 'this is chartsoptions');
  }
}
