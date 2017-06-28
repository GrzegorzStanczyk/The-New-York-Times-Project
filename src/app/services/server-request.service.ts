import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ServerRequestService {
  url: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  
  constructor(private http: Http) { }

  getServers(question: string, page: number, date) {
    let params;
    if (date === undefined || date === null) {
      params = {
        'api-key': 'd8e00c8784034ecea61d8abdd367d579',
        'q': question,
        'sort': "newest",
        'hl': true,
        'page': page
      }
    } else {
      //Parse object values to appropriate string
      const begin_date = `${date.beginDate.year}${("" + date.beginDate.month).length === 1 ? "0" + date.beginDate.month : date.beginDate.month}${("" + date.beginDate.day).length === 1 ? "0" + date.beginDate.day : date.beginDate.day}`;
      const end_date = `${date.endDate.year}${("" + date.endDate.month).length === 1 ? "0" + date.endDate.month : date.endDate.month}${("" + date.endDate.day).length === 1 ? "0" + date.endDate.day : date.endDate.day}`
      
      params = {
        'api-key': 'd8e00c8784034ecea61d8abdd367d579',
        'q': question,
        'begin_date': begin_date,
        'end_date': end_date,
        'sort': "newest",
        'hl': true,
        'page': page
      }
    }
    return this.http.get(this.url, { params: params })
      .map((response: Response) => {
        return response.json();
      }).catch((error: Response) => {
        return Observable.throw('Something went wrong');
      });
  }
}