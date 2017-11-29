import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataProvider} from "../../app/dataProvider";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'page-about',
  templateUrl: 'trend.html'
})
export class TrendPage {

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {

  }

  ionViewDidLoad() {
    var myChart;
    var areaChartOptions = {
      title: {
        text: 'Power'
      },
      chart: {
        type: 'areaspline',
        zoomType: 'x'
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        plotLines: [{
          color: 'red', // Color value
//                                dashStyle: 'longdashdot', // Style of the plot line. Default to solid
          value: 0, // Value of where the line will appear
          width: 2 // Width of the line
        }],
        title: {
          text: 'Watt'
        }
      },
      rangeSelector: {
        selected: 1
      },
      plotOptions: {
        series: {
          fillOpacity: 0.1,
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Heatpump Power Consumption',
        color: '#ff0000',
        data: []
      }, {
        name: 'House Energy Consumption',
        color: '#0099ff',
        data: []
      }, {
        name: 'PV Production',
        color: '#66ff33',
        data: []
      }, {
        name: 'Power Grid',
        color: '#000000',
        data: []
      }]
    };

    myChart = Highcharts.chart('chart', areaChartOptions);

    this.dataProvider.dataSource.addEventListener('message', function (event) {
      var data = JSON.parse(event.data);
      var date = data.timestamp * 1000;
      var powerPv = data.powerFlowSite.powerPv == null ? 0 : data.powerFlowSite.powerPv;
      var powerGrid = data.powerFlowSite.powerGrid == null ? 0 : data.powerFlowSite.powerGrid;
      var powerLoad = data.powerFlowSite.powerLoad == null ? 0 : data.powerFlowSite.powerLoad;
      // var selfConsumption = data.powerFlowSite.selfConsumption == null ? 0 : data.powerFlowSite.selfConsumption;
      // var autonomy = data.powerFlowSite.autonomy == null ? 0 : data.powerFlowSite.autonomy;
      powerLoad = Math.abs(powerLoad.toFixed(2));
      var heatpumpConsumption = data.myHomeControlData.heatpumpPowerConsumption * 1000;

      myChart.series[0].addPoint([date, heatpumpConsumption]);
      myChart.series[1].addPoint([date, powerLoad]);
      myChart.series[2].addPoint([date, powerPv]);
      myChart.series[3].addPoint([date, powerGrid]);
    });
  }
}
