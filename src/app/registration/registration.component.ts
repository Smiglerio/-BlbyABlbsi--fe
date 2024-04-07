import {Component, EventEmitter, Output} from '@angular/core';
import {DemoService} from "../services/demo.service";
import {ToastService} from "angular-toastify";
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from "@angular/material/icon";
import {LoginDTO, UserDTO} from "../model/model";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIcon, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private formBuilder: FormBuilder, private demoService: DemoService, private toastService: ToastService) {}

  @Output() newUserEvent = new EventEmitter<UserDTO>();

  formular = this.formBuilder.group({
    meno: ['', Validators.required],
    priezvisko: [''],
    username: [''],
    heslo: [''],
    vek: [''],
    vaha: [''],
    vyska: [''],
    pohlavie: ['']
  });

  formular1 = this.formBuilder.group({
    username: ['', Validators.required],
    heslo: ['']
  });

  onSubmit() {
    console.log(this.formular.value);
    if (this.formular.value.meno != null && this.formular.value.priezvisko != null) {
      let user: UserDTO = new UserDTO(null, this.formular.value.meno, this.formular.value.priezvisko, this.formular.value.username, this.formular.value.heslo, this.formular.value.vek, this.formular.value.vaha, this.formular.value.vyska, this.formular.value.pohlavie);
      this.demoService.vytvorUsera(user).subscribe(id => {
        console.log('User bol uspesne vytvoreny')
        user.id = id;
        this.newUserEvent.emit(user);
      }, error => {
        console.error('chyba vytvarania Usera!')
        this.toastService.error("chyba vytvarania Usera!!!");
      });
    }
  }

  login(): void {
    console.log(this.formular1.value);
    this.demoService.login(this.formular1.value.username, this.formular1.value.heslo).subscribe(response => {
      console.log('Prihlásenie úspešné');
    }, error => {
      console.error('Prihlásenie zlyhalo', error);
    });
  }
}