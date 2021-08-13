import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { concatMap, pluck, tap } from "rxjs/operators";

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styles: [
  ]
})
export class ProtectedComponent implements OnInit {

  metadata = {};

  constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  callApi2(): void {
    this.http.get('http://localhost:3000/api/private').subscribe(result => console.log(result));
  }

  callApi3(): void {

    this.http.get('https://dev-ronin.us.auth0.com/api/v2/users/auth0|602519c2c8851c00690171b5').subscribe(result => console.log(result));
  }

  callApi(): void {
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`https://dev-ronin.us.auth0.com/api/v2/users/${user.sub}`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.metadata = meta))
    )
    .subscribe();
  }

  callApi4(): void {
    this.auth.user$
    .pipe(
      concatMap((user) =>
        // Use HttpClient to make the call
        this.http.get(
          encodeURI(`http://localhost:3000/api/private`)
        )
      ),
      pluck('user_metadata'),
      tap((meta) => (this.metadata = meta))
    )
    .subscribe();
  }

}
