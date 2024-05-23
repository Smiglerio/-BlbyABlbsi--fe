import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DemoService } from '../services/demo.service';
import { ToastService } from 'angular-toastify';
import { Subscription } from 'rxjs';
import { UserDTO } from '../model/model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService, private router: Router, private authService: AuthService) {}

  formular = new FormGroup({
    username: new FormControl(),
    heslo: new FormControl(),
    vaha: new FormControl(),
    vyska: new FormControl(),
    pohlavie: new FormControl(),
    vek: new FormControl(),
  });
  public chart: any;

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
  ngOnInit() {
    this.nastavForm();
    this.createChart();
    const token = localStorage.getItem("token");
    if (token) {
      this.demoService.getVahyByUserId(token).subscribe(input => {
        let datumy: string[] = [];
        let vahy: string[] = [];
        console.log(input)
        input.forEach((item: any[]) => {
          vahy.push(item[0]);
          datumy.push(item[1]);
        });
        this.updateChart(vahy, datumy);
      });
    }
  }

  nastavForm() {
    const token = localStorage.getItem('token');
    if (token) {
      this.demoService.getUzivatelFromToken(token).subscribe(user => {
        if (user) {
          this.formular.patchValue({
            username: user.username,
            heslo: user.heslo,
            vaha: user.vaha,
            vek: user.vek,
            vyska: user.vyska,
            pohlavie: user.pohlavie
          });
          console.log(user.username);
        }
      });
    } else {
      console.error('Token nie je k dispozícii.');
    }
  }

  nastavFormUsername() {
    const token = localStorage.getItem('token');
    if (token) {
      this.demoService.getUzivatelFromToken(token).subscribe(user => {
        if (user) {
          const username = user.username;
          console.log('Username:', username);
        }
      });
    } else {
      console.error('Token nie je k dispozícii.');
    }
  }

  zmenPouzivatela() {
    console.log(this.formular.value);
    const token = localStorage.getItem('token');
    if (this.formular.value) {
      let user = new UserDTO(null,
        this.formular.value.username, this.formular.value.heslo, this.formular.value.vek, this.formular.value.vaha,
        this.formular.value.vyska, this.formular.value.pohlavie);
      this.demoService.ZmenUsera(user).subscribe(id => {
        user.id = id;
        console.log('User bol uspesne zmenený');
      }, error => {
        console.error('chyba zmeny Usera!');
        this.toastService.error("chyba zmenenia Usera!!!");
      });
    }
  }
}
