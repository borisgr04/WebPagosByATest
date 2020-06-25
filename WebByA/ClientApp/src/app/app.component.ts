import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(private http: HttpClient) {
  }

  throwError(){
    throw new Error('My Pretty Error');
  }

  throwHttpError(){
    this.http.get('urlhere').subscribe();
  }

}
