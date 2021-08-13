import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { GeneralComponent } from './components/general/general.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProtectedComponent,
    GeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-ronin.us.auth0.com',
      clientId: 'Cn0AxfHbfhP93Utz5Amxw9vYNbrrJLPX',
      // Request this audience at user authentication time
      audience: 'https://dev-ronin.us.auth0.com/api/v2/',
      // Request this scope at user authentication time
      scope: 'read:current_user',
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-ronin.us.auth0.com/api/v2/' (note the asterisk)
            uri: '/api/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'http://localhost:3000'
            }
          }
        ]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
