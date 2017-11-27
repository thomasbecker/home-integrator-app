import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    const EventSource: any = window['EventSource'];
    var heatpumpConsumption
    var categories = ['Power Grid', 'House Consumption', 'Heatpump Consumption', 'PV Production'];
    var currentBarChart = Highcharts.chart('barchart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Current Consumption/Yield'
      },
      xAxis: {
        categories: categories,
        reversed: false,
        labels: {
          step: 1
        }
      },
      tooltip: {
        valueSuffix: 'W'
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: "Consumption / Yield",
        data: [{y: -500, color: '#000000'}, {y: -500, color: '#0099ff'}, {y: -500, color: '#ff0000'}, {y: -500, color: '#66ff33'}]
      }],
    });

    var consumptionSource = new EventSource("http://192.168.178.60:9000/streamMyHomeControlRealtimeData");
    consumptionSource.addEventListener('message', function (event) {
      var data = JSON.parse(event.data);
      heatpumpConsumption = data.heatpumpPowerConsumption * 1000;
    });

    var powerFlowSource = new EventSource("http://192.168.178.60:9000/streamPowerFlowRealtimeData");
    powerFlowSource.addEventListener('message', function (event) {
      var data = JSON.parse(event.data);
      var powerPv = data.powerPv == null ? 0 : data.powerPv;
      var powerGrid = data.powerGrid == null ? 0 : data.powerGrid;
      var powerLoad = data.powerLoad == null ? 0 : data.powerLoad;
//                            powerGrid = powerGrid.toFixed(2)
      powerLoad = Math.abs(powerLoad.toFixed(2));
      console.log(powerLoad + " grid: " + powerGrid);
      currentBarChart.series[0].setData([powerGrid, powerLoad, heatpumpConsumption, powerPv])
    });
  }
}
