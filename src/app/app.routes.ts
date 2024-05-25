import { Routes } from '@angular/router';
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {TrainingPlanComponent} from "./training-plan/training-plan.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CreateTrainingPlanComponent} from "./create-training-plan/create-training-plan.component";
import {CreateExerciseComponent} from "./create-exercise/create-exercise.component";
import {ProgressPageComponent} from "./progress-page/progress-page.component";

export const routes: Routes = [
  { path: 'profile-page', component: ProfilePageComponent},
  { path: 'training-plan', component: TrainingPlanComponent},
  { path: 'home-page', component: HomePageComponent },
  { path: 'registration', component: RegistrationComponent},
  {path: 'create-training-plan', component: CreateTrainingPlanComponent},
  {path:'create-exercise', component: CreateExerciseComponent},
  {path: 'progress-page/:planid', component: ProgressPageComponent},
  { path: '**', redirectTo:'/home-page',pathMatch:'full' },
  { path: '', redirectTo:'/home-page',pathMatch:'full'},
];
