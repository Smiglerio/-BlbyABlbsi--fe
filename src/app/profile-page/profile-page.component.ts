import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DemoService } from '../services/demo.service';
import {AngularToastifyModule, ToastService} from 'angular-toastify';
import { forkJoin, map, Subscription } from 'rxjs';
import { UserDTO } from '../model/model';
import { Chart } from 'chart.js/auto';
import {
  MatAccordion, MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import { DecimalPipe, NgForOf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatProgressSpinner, ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { ThemePalette } from "@angular/material/core";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatAccordion,
    NgForOf,
    MatExpansionPanel,
    MatButton,
    DecimalPipe,
    MatCard,
    MatCardContent,
    MatProgressSpinner,
    AngularToastifyModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  @ViewChild('changePasswordDialog') changePasswordDialog!: TemplateRef<any>;

  formular: FormGroup;
  zmenaHeslaForm: FormGroup;

  public chart: any;
  treningovePlany: any;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  constructor(
    private formBuilder: FormBuilder,
    private demoService: DemoService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.formular = this.formBuilder.group({
      username: new FormControl(),
      heslo: new FormControl(),
      vaha: new FormControl(),
      vyska: new FormControl(),
      vek: new FormControl(),
      pohlavie: new FormControl({ value: '', disabled: true } as any),
      BMI: new FormControl({ value: 0, disabled: true }),
    });

    this.zmenaHeslaForm = this.formBuilder.group({
      aktualneHeslo: ['', Validators.required],
      noveHeslo: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.nastavForm();
    this.createChart();
    this.loadData();
  }

  openDialog(): void {
    this.dialog.open(this.changePasswordDialog);
  }

  onChangePassword() {
    if (this.zmenaHeslaForm.valid) {
      const token = localStorage.getItem('token');
      let user = new UserDTO(null, token,
        "", this.zmenaHeslaForm.value.aktualneHeslo, 0,"",
        0, this.zmenaHeslaForm.value.noveHeslo);
      this.demoService.UpdatePassword(user).subscribe(temp => {
        console.log(temp);
        if (temp!= null) {
          this.toastService.success("Úspešne zmeneé heslo");
        } else {
          this.toastService.error("Zlé zadané staré heslo");
        }
      });
      this.zmenaHeslaForm.reset();
      this.dialog.closeAll();
    }
  }

  onCancelChangePassword(): void {
    this.zmenaHeslaForm.reset();
    this.dialog.closeAll();
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['noveHeslo'].value === frm.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: "Váha",
            data: [],
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  updateChart(vahy: string[], cas: string[]) {
    this.chart.data.labels = cas;
    this.chart.data.datasets[0].data = vahy;
    this.chart.update();
  }

  loadData() {
    const token = localStorage.getItem("token");
    if (token) {
      this.demoService.getVahyByUserId(token).subscribe(input => {
        let datumy: string[] = [];
        let vahy: string[] = [];
        input.forEach((item: any[]) => {
          vahy.push(item[0]);
          datumy.push(item[1]);
        });
        this.updateChart(vahy, datumy);
        this.loadTreningovePlany(token);
      });
    }
  }

  loadTreningovePlany(token: string): void {
    this.demoService.getTreningovePlanyUsera(token).subscribe((treningovePlany: any[]) => {
      const treningovePlanyWithCvicenia$ = treningovePlany.map(plan => {
        return this.demoService.getCviceniaByPlanForUser(token + "/" + plan.planId + "/").pipe(
          map(cvicenia => {
            return { ...plan, cvicenia: cvicenia };
          })
        );
      });
      forkJoin(treningovePlanyWithCvicenia$).subscribe((results: any[]) => {
        this.treningovePlany = results.map(plan => {
          return { ...plan, value: this.calculateProgress(plan.cvicenia) };
        });
      });
    });
  }

  calculateProgress(cvicenia: any[]): number {
    if (!cvicenia || cvicenia.length === 0) {
      return 0;
    }
    const completed = cvicenia.filter(cvik => cvik.odcvicene).length;
    return (completed / cvicenia.length) * 100;
  }

  nastavForm() {
    const token = localStorage.getItem('token');
    if (token) {
      this.demoService.getUzivatelFromToken(token).subscribe(user => {
        user = JSON.parse(user);
        let BMI = Math.round(user.vaha / Math.pow(user.vyska / 100, 2));
        this.formular.patchValue({
          vek: user.vek,
          vaha: user.vaha,
          vyska: user.vyska,
          pohlavie: user.pohlavie,
          BMI: BMI
        });
      });
    } else {
      this.toastService.error('Token nie je k dispozícii.');
    }
  }

  zmenPouzivatela() {
    if (this.formular.value) {
      let user = new UserDTO(null, localStorage.getItem('token'),
        "", "", this.formular.value.vek, this.formular.value.vaha,
        this.formular.value.vyska, this.formular.value.pohlavie);
      this.demoService.ZmenUsera(user).subscribe(id => {
        user.id = id;
        this.loadData();
        this.nastavForm();
        this.toastService.success('zmena bola vykonaná');
      }, error => {
        console.error('chyba zmeny Usera!');
        this.toastService.error("chyba zmenenia Usera!!!");
      });
    }
  }

  deletePlan(plan: any): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.demoService.deleteTreningovePlanyUsera(token + "/" + plan.planId + "/").subscribe((item: any) => {
        this.loadTreningovePlany(token);
      });
    }
  }

  navigateToProgress(planid: number): void {
    const temp = "/progress-page/" + planid;
    this.router.navigate([temp]);
  }
}
