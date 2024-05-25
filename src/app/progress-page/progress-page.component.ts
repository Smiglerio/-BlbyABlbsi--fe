import { Component, OnInit } from '@angular/core';
import { DemoService } from "../services/demo.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MatButton } from "@angular/material/button";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatHeaderCell } from "@angular/material/table";
import { ThemePalette } from "@angular/material/core";
import { MatProgressSpinner, ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-progress-page',
  standalone: true,
  imports: [
    MatButton,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    MatCardModule,
    MatHeaderCell,
    MatProgressSpinner,
    MatCheckboxModule,
    DecimalPipe,
  ],
  templateUrl: './progress-page.component.html',
  styleUrls: ['./progress-page.component.css']
})
export class ProgressPageComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  treningovyPlan: any;
  cvicenia: any;
  constructor(
    private demoservice: DemoService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let planId = this.router.url.split('/')[2];
    const token = localStorage.getItem('token');
    if (token) {
      this.demoservice.getPlanByID(parseInt(planId)).subscribe((plan: any) => {
        this.treningovyPlan = plan;
        this.demoservice.getCviceniaByPlanForUser(token + "/" + plan.planId + "/").subscribe((cvicenia: any) => {
          this.cvicenia = cvicenia;
          this.updateProgress();
        });
      });
    }
  }

  updateProgress(): void {
    if (this.cvicenia && this.cvicenia.length > 0) {
      const completed = this.cvicenia.filter((cvik: any) => cvik.odcvicene).length;
      this.value = (completed / this.cvicenia.length) * 100;
    } else {
      this.value = 0;
    }
  }

  LiveupdateProgress(): void {
    const checkboxes = document.querySelectorAll('.cvik-checkbox input[type="checkbox"]');
    if (checkboxes.length > 0) {
      const completed = Array.from(checkboxes).filter((checkbox: any) => checkbox.checked).length;
      this.value = (completed / checkboxes.length) * 100;
    } else {
      this.value = 0;
    }
  }


  changeStatus(id: number, checked: boolean, planId: String): void {
    const cvik = this.cvicenia.find((cvik: any) => cvik.cvicenieid === id);
    if (cvik) {
      cvik.odcvicene = checked;
    }
    const token = localStorage.getItem('token');
    if (token) {
      this.demoservice.updatePokrok(token + "/" + id + "/" + planId + "/"  + checked + "/").subscribe((plan: any) => {
        this.LiveupdateProgress();
      })
    }
  }
}
