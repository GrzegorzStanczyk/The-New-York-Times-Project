import { Component, HostListener, Inject } from '@angular/core';
import { Response } from '@angular/http'
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';
import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ServerRequestService } from './services/server-request.service';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: string = 'The New York Times Project';
  public renderContent: Array<any> = [];
  
  public scrollEvent: Subject<MouseEvent> = new Subject<MouseEvent>();
  public scrollObservable = this.scrollEvent.asObservable().throttleTime(200);
  
  public term = new FormControl();
  public inputSearch: string = '';
  public currentPage: number = 0;
  public model: Object;


  public myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy.mm.dd',
  };

  constructor(private serverRequest: ServerRequestService, @Inject(DOCUMENT) private document: Document) {
    this.term.valueChanges
      .debounceTime(800)
      .subscribe(term => this.onSearch(term));
    this.scrollObservable.subscribe(() => this.onGetMore(this.inputSearch)); 
  }

  public onSearch(term): void {
    this.currentPage = 0;
    this.serverRequest
      .getServers(term, this.currentPage, this.model)
      .subscribe(data => {
        this.renderContent = data.response.docs;
      },
      (error) => console.log(error));
  }

  public onGetMore(term): void {
    this.currentPage += 1;
    this.serverRequest
      .getServers(term, this.currentPage, this.model)
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
    // this.onSearch("");
  }
}
