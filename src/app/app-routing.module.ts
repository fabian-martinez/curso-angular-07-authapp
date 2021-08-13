import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GeneralComponent } from './components/general/general.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'general', component: GeneralComponent},
  {path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard]},
  {path: '**', pathMatch: 'full', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
