import {Component, NgModule, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {AngularToastifyModule} from "angular-toastify";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {DemoService} from "../services/demo.service";
import {MatTable} from "@angular/material/table";
import {MatTableModule} from '@angular/material/table';
import {MatTabHeader} from "@angular/material/tabs";
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
    MatTableModule,
    MatTabHeader
  ],
  templateUrl: './training-plan.component.html',
  styleUrl: './training-plan.component.css'
})

export class TrainingPlanComponent implements OnInit{
  data :any;
  data2 :any;
  constructor(private demoService : DemoService) { }
  ngOnInit() {
    this.loadTrainingPlans();
  }

  displayedColumns: string[] = ['nazovCviku', 'narocnostCviku', 'popisCviku'];
  displayedColumns2: string[] = ['planId','nazov', 'popis'];
    loadData(): void {
      this.data = this.demoService.getCvicenieList();
      console.log(this.data);
      console.log("tadaaaaaa");
    }
    loadTrainingPlans() : void {
      this.data2 = this.demoService.getTreningovePlanyList();
    }
  pokus(planId: number): void {
    console.log(planId);
  }
}


