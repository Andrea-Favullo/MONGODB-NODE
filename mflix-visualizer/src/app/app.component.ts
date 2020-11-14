import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mflix-visualizer';
  results : Object[];
  obs : Observable<object>;
  url: string = "https://3000-ea48c270-e9a0-4c2a-a48a-ea44c13b04ec.ws-eu01.gitpod.io/";
  
  constructor(public http: HttpClient) { }

  ngOnInit(): void {  }

  load10Movies(){
    this.obs = this.http.get<Object[]>(this.url.concat("movies/list"));
    this.obs.subscribe(this.getData);
  }

  getData = (data) => {
    this.results = data;
  }
}
