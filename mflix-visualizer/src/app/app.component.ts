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
  constructor(private http : HttpClient){}

  load10Movies(){
    this.obs = this.http.get("https://3000-b2414a9c-4000-4343-aa5b-a81dbf28ecb0.ws-eu01.gitpod.io/movies/list/10");
    this.obs.subscribe(this.getData);
  }

  getData = (data) => {
    this.results = data;
  }
}
