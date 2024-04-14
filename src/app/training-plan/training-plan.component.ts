import {Component, NgModule} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {AngularToastifyModule} from "angular-toastify";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {DemoService} from "../services/demo.service";
import {MatTable} from "@angular/material/table";
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-training-plan',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatTooltip,
    AngularToastifyModule,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    RouterOutlet,
    MatMenuTrigger,
    MatTable,
    MatTableModule
  ],
  templateUrl: './training-plan.component.html',
  styleUrl: './training-plan.component.css'
})

export class TrainingPlanComponent {
  data :any;
  constructor(private demoService : DemoService) { }

  displayedColumns: string[] = ['nazovCviku', 'narocnostCviku', 'popisCviku'];

    loadData(): void {
      this.data = this.demoService.getCvicenieList();
      console.log(this.data);
    }
}
