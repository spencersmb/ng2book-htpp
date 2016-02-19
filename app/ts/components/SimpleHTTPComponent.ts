/*
 * Angular
 */
import {Component} from 'angular2/core';
import {Http, Response} from 'angular2/http';

@Component({
  selector: 'simple-http',
  template: `
  <h2>Basic Request</h2>
  <button type="button" (click)="makeRequest()">Make Request</button>
  <div *ngIf="loading">loading...</div>
  <pre>{{data | json}}</pre>
`
})
export class SimpleHTTPComponent {
  data: Object;
  loading: boolean;

  constructor(public http: Http) {
  }

  makeRequest(): void {
    this.loading = true;

    //When our http.request returns (from the server) the stream will emit a Response object. We extract
    //the body of the response as an Object by using json and then we set this.data to that Object.
    this.http.request('http://jsonplaceholder.typicode.com/posts/1')
      .subscribe((res: Response) => {
        this.data = res.json();

        //Since we have a response, we’re not loading anymore so we set this.loading = false
        this.loading = false;
      });
  }
}

