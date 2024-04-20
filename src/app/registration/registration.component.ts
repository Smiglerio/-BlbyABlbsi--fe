import {Component, EventEmitter, Output} from '@angular/core';
import {DemoService} from "../services/demo.service";
import {ToastService} from "angular-toastify";
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {LoginDTO, UserDTO} from "../model/model";
import {provideRouter, Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIcon, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService, private router: Router,private authService: AuthService) {}

  @Output() newUserEvent = new EventEmitter<UserDTO>();



  formular = new FormGroup({
    meno: new FormControl(),
    priezvisko: new FormControl(),
    username: new FormControl(),
    heslo: new FormControl(),
    vaha: new FormControl(),
    vyska: new FormControl(),
    pohlavie: new FormControl(),
    vek: new FormControl(),
  })
  formular1 = new FormGroup({
      username: new FormControl(),
      heslo: new FormControl(),
  })
  onSubmit() {
    console.log(this.formular.value);
    if (this.formular.value) {
      let user = new UserDTO(null,this.formular.value.meno,this.formular.value.priezvisko,
        this.formular.value.username, this.formular.value.heslo,this.formular.value.vek,this.formular.value.vaha,
        this.formular.value.vyska,this.formular.value.pohlavie);
      this.demoService.vytvorUsera(user).subscribe(id => {
        console.log('User bol uspesne vytvoreny')
        user.id = id;
        this.newUserEvent.emit(user);
        this.router.navigate(['../profile-page'])
      }, error => {
        console.error('chyba vytvarania Usera!')
        this.toastService.error("chyba vytvarania Usera!!!");
      });
    }
  }

  login(): void {
    console.log(this.formular1.value);
    if (this.formular1.value.username && this.formular1.value.heslo) {
      this.demoService.login(this.formular1.value.username, this.formular1.value.heslo).subscribe(response => {
        console.log('Prihlásenie úspešné');
        this.router.navigate(['../profile-page'])
      }, error => {
        console.error('Prihlásenie zlyhalo', error);
      });
    }
  }

  auth(): AuthService {
    return this.authService;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('odhlaseny..')
    });
  }
}
