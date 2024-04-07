import { Routes } from '@angular/router';
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {TrainingPlanComponent} from "./training-plan/training-plan.component";
import {HomePageComponent} from "./home-page/home-page.component";

export const routes: Routes = [
  { path: 'profile-page', component: ProfilePageComponent},
  { path: 'training-plan', component: TrainingPlanComponent},
  { path: 'home-page', component: HomePageComponent },
  { path: '**', redirectTo:'/home-page',pathMatch:'full' },
  { path: '', redirectTo:'/home-page',pathMatch:'full'},
];
