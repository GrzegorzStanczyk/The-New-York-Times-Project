import { Component, HostListener, Inject } from '@angular/core';
import { Response } from '@angular/http'
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';


import { ServerRequestService } from './services/server-request.service';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: string = 'The New York Times Project';
  public renderContent: Array<any> = []
  public scrollEvent: Subject<MouseEvent> = new Subject<MouseEvent>();
  public scrollObservable = this.scrollEvent.asObservable().throttleTime(200);
  
  public inputSearch: string = '';
  public currentPage: number = 0;
  public model: Object;

  public myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy.mm.dd',
  };


  // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
  // to set initial date range value using the selDateRange attribute.
  // private model: Object = {
  //   beginDate: { year: 2016, month: 10, day: 9 },
  //   endDate: { year: 2018, month: 10, day: 19 }
  // };

  constructor(private serverRequest: ServerRequestService, @Inject(DOCUMENT) private document: Document) {
  }

  public onSearch(): void {
    this.serverRequest
      .getServers(this.inputSearch || "Poland", this.currentPage, this.model)
      .subscribe(data => {
        this.renderContent = data.response.docs;
      },
      (error) => console.log(error));
  }

  public onGetMore(): void {
    this.currentPage += 1;
    this.serverRequest
      .getServers(this.inputSearch || "Poland", this.currentPage, this.model)
      .subscribe(data => {
        this.renderContent = [...this.renderContent, ...data.response.docs];
      },
      (error) => console.log(error));
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.scrollEvent.next(event);
    }
  }

  ngOnInit(): void {
    this.onSearch();
    this.scrollObservable.subscribe(() => this.onGetMore());
  }
}
