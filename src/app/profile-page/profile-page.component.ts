import { Component } from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {AuthService} from "../services/auth.service";
import {DemoService} from "../services/demo.service";
import {ToastService} from "angular-toastify";
import {Subscription} from "rxjs";
import {UserDTO} from "../model/model";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatToolbar,
    RouterOutlet,
    MatMenuItem,
    MatButton,
    RouterLink,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatDivider,
    ReactiveFormsModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService, private router: Router,private authService: AuthService) {}


  formular = new FormGroup({
    username: new FormControl(),
    heslo: new FormControl(),
    vaha: new FormControl(),
    vyska: new FormControl(),
    pohlavie: new FormControl(),
    vek: new FormControl(),
  })

  ngOnInit() {
    this.nastavForm();
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
          const username = user.username; // získanie hodnoty username z objektu user
          console.log('Username:', username);
          // tu môžete ďalej pracovať s hodnotou username, napríklad ju zobraziť v konzole alebo použiť na inú účel
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
        this.formular.value.username, this.formular.value.heslo,this.formular.value.vek,this.formular.value.vaha,
        this.formular.value.vyska,this.formular.value.pohlavie);
      this.demoService.ZmenUsera(user).subscribe(id => {
        user.id = id;
        console.log('User bol uspesne zmenený')
      }, error => {
        console.error('chyba zmeny Usera!')
        this.toastService.error("chyba zmenenia Usera!!!");
      });
    }
  }

}
