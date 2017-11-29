import { Component } from '@angular/core';

import { TrendPage } from '../trend/trend';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TrendPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
