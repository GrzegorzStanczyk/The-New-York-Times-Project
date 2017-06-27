import { Component } from '@angular/core';
import { Response } from '@angular/http'
import { Observable } from 'rxjs';

import { ServerRequestService } from './services/server-request.service';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'The New York Times Project';
  inputSearch: string = '';
  renderContent: Array<any> = []
  currentPage: number = 0;

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy.mm.dd',
  };
  
  model;
  
  // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
  // to set initial date range value using the selDateRange attribute.
  // private model: Object = {
  //   beginDate: { year: 2016, month: 10, day: 9 },
  //   endDate: { year: 2018, month: 10, day: 19 }
  // };

  constructor(private serverRequest: ServerRequestService) {
  }

  onSearch(): void {
    this.serverRequest
      .getServers(this.inputSearch || "Poland", this.currentPage, this.model)
      .subscribe(data => {
        this.renderContent = data.response.docs;
      },
      (error) => console.log(error))
  }

  onGetMore(e): void {
    e.preventDefault();
    this.currentPage += 1;
    this.serverRequest
      .getServers(this.inputSearch || "Poland", this.currentPage, this.model)
      .subscribe(data => {
        this.renderContent = [...this.renderContent, ...data.response.docs];
      },
      (error) => console.log(error))
  }

  ngOnInit(): void {
    this.onSearch()
  }
}
