import { Injectable } from '@angular/core';
const EventSource: any = window['EventSource'];

@Injectable()
export class DataProvider {

  private _dataSource = new EventSource("http://192.168.178.60:9000/homeData");

  constructor() {

  }

  get dataSource(): any {
    return this._dataSource;
  }

}
