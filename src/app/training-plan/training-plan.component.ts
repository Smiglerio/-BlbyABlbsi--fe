import {Component, Input, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {AngularToastifyModule} from "angular-toastify";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {DemoService} from "../services/demo.service";
import {MatTable} from "@angular/material/table";
import {MatTableModule} from '@angular/material/table';
import {MatTabHeader} from "@angular/material/tabs";
import {CommonModule} from "@angular/common";
import {CvicenieDTO} from "../model/model";
import {UserDTO} from "../model/model";
import {MatExpansionModule} from "@angular/material/expansion";
import {AuthService} from "../services/auth.service";

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
    MatTabHeader,
    CommonModule,
    MatExpansionModule,
  ],
  templateUrl: './training-plan.component.html',
  styleUrl: './training-plan.component.css'
})

export class TrainingPlanComponent implements OnInit{
  data :any;
  cvicenia: {[key: number]: any[]} = {};
  treningovePlany : any;
  panelOpenState = false;
  userId: any;
  constructor(private demoService : DemoService, private authService: AuthService) { }
  ngOnInit() {
    this.demoService.getUzivatelFromToken(this.authService.getToken()).subscribe(user => {
      this.userId = parseInt(user.split(',')[6].split(':')[1])
      this.loadTreningovePlany();
    });
  }
  loadData(): void {
      this.data = this.demoService.getCvicenieList();
      console.log(this.data);
      console.log("tadaaaaaa");
    }
    loadTreningovePlany() : void {
      this.demoService.getTreningovePlanyList().subscribe((treningovePlany: any) => {
        this.treningovePlany = treningovePlany;
        this.loadData();
      })
    }

  loadCviceniaByPlanId(id: number): void {
    console.log("jujhuuhu");
    this.demoService.getCviceniaByPlan(id).subscribe((cvicenia: any) => {
      this.cvicenia[id] = cvicenia;
      console.log("cvicenia");
    });
  }

  createUzivatelTreningPlan(userId: number, planId: number) : void {
    console.log("zaciatok pridavania");
    this.demoService.createUzivatelTreningPlan(userId,planId).subscribe((userPlan) => {
      console.log("pridane?");
    })
  }
}


