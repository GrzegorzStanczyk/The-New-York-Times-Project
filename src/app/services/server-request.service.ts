import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ServerRequestService {
  url: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  constructor(private http: Http) { }

  //Parse object values to appropriate string
  leadingZero(i): string {
    return (i < 10)? '0'+i : i;
  }

  getServers(question: string, page: number, date) {
    let params = new URLSearchParams();
    params.set('api-key', 'd8e00c8784034ecea61d8abdd367d579');
    params.set('sort', 'newest');
    params.set('hl', 'true');
    params.set('page', page.toString());   
    if (date) {
      const begin_date = `${date.beginDate.year}${this.leadingZero(date.beginDate.month)}${this.leadingZero(date.beginDate.day)}`;
      const end_date = `${date.endDate.year}${this.leadingZero(date.endDate.month)}${this.leadingZero(date.endDate.day)}`;
      params.set('begin_date', begin_date);   
      params.set('end_date', end_date);
    }    
    if (question) {
      params.set('q', question); 
    }
    return this.http.get(this.url, { params })
      .map((response: Response) => {
        return response.json();
      }).catch((error: Response) => {
        return Observable.throw('Something went wrong');
      });
  }
}