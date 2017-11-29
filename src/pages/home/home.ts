import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as Highcharts from 'highcharts';
import {DataProvider} from "../../app/dataProvider";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
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

    this.dataProvider.dataSource.addEventListener('message', function (event) {
      var data = JSON.parse(event.data);
      // var date = data.timestamp * 1000;
      var powerPv = data.powerFlowSite.powerPv == null ? 0 : data.powerFlowSite.powerPv;
      var powerGrid = data.powerFlowSite.powerGrid == null ? 0 : data.powerFlowSite.powerGrid;
      var powerLoad = data.powerFlowSite.powerLoad == null ? 0 : data.powerFlowSite.powerLoad;
      // var selfConsumption = data.powerFlowSite.selfConsumption == null ? 0 : data.powerFlowSite.selfConsumption;
      // var autonomy = data.powerFlowSite.autonomy == null ? 0 : data.powerFlowSite.autonomy;
      powerLoad = Math.abs(powerLoad.toFixed(2));
      var heatpumpConsumption = data.myHomeControlData.heatpumpPowerConsumption * 1000;
      currentBarChart.series[0].setData([powerGrid, powerLoad, heatpumpConsumption, powerPv])
    });
  }
}
